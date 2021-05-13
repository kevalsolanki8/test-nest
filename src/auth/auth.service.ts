import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from 'src/users/users.model';
import { User } from 'src/users/interface/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import { BycrptService } from './bycrpt.service';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/change-password.dto';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(UserEntity.name) private userModel: Model<User>,
        private bycrptService: BycrptService,
        private jwtService: JwtService,
    ) {}

    async signup(credentials: AuthDto) {
        const { email, password } = credentials;
        credentials.password = await this.bycrptService.hashPassword(password);
        const newUser = new this.userModel(credentials);
        await newUser.save();

        return {
            token: this.jwtService.sign({ id: newUser.id, email }),
        };
    }

    async login(credentials: AuthDto) {
        const { email, password } = credentials;
        const foundUser = await this.userModel.findOne({
            email,
        });

        if (!foundUser) throw new NotFoundException('No user found');

        const isValidated = await this.bycrptService.validateHash(
            password,
            foundUser.password,
        );
        if (!isValidated)
            throw new UnauthorizedException('Invalid Credentials');

        return {
            token: this.jwtService.sign({ id: foundUser.id, email }),
        };
    }

    async changePassword(user: any, passwords: ChangePasswordDto) {
        const { oldPassword, newPassword } = passwords;
        const isValidated = await this.bycrptService.validateHash(
            oldPassword,
            user.password,
        );

        if (!isValidated)
            throw new UnauthorizedException('Invalid Credentials');

        const hashPassword = await this.bycrptService.hashPassword(newPassword);
        await user.update({ password: hashPassword });
        return { message: 'Password Updated' };
    }
}
