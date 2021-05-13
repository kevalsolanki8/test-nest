import { Injectable } from '@nestjs/common';
import { User } from './interface/users.interface';
import { UserDto } from './dto/users.dto';
@Injectable()
export class UsersService {
    getSingleUser(user: User) {
        const { id, email, username } = user;
        return { id, email, username };
    }

    async updateUser(user: any, data: UserDto) {
        const updatedUser = await user.update(data);
        return updatedUser;
    }
}
