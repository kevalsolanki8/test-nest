import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}
    @Get()
    getSingleUser(@Req() req: any) {
        return this.userService.getSingleUser(req.user);
    }

    @Patch()
    async updateUser(@Req() req: any) {
        return this.userService.updateUser(req.user, req.body);
    }
}
