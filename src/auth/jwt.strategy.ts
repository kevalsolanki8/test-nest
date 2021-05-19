import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_SECRET } from 'src/constants/jwt.constant';
import { JwtPayload } from './interface/jwt-payload.interface';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from 'src/users/users.model';
import { Model } from 'mongoose';
import { User } from '../users/interface/users.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(UserEntity.name) private userModel: Model<User>,
        private configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.userModel.findById(payload.id);
        if (user) {
            return user;
        }
        return { ...payload };
    }
}
