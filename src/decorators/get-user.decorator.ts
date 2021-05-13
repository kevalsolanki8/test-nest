import { createParamDecorator } from '@nestjs/common';
import { User } from '../users/interface/users.interface';
export const GetUser = createParamDecorator((data, req): User => {
    console.log('DATA', data);
    return req.user;
});
