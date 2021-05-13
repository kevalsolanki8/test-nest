import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UserEntity } from './users.model';
import { UsersService } from './users.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UserEntity.name, schema: UserEntity.schema },
        ]),
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
