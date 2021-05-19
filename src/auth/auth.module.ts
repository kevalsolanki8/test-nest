import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JWT_SECRET } from 'src/constants/jwt.constant';
import { UserEntity } from 'src/users/users.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BycrptService } from './bycrpt.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UserEntity.name, schema: UserEntity.schema },
        ]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '3600s',
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, BycrptService, JwtStrategy],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
