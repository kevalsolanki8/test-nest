import {
    Body,
    Controller,
    Patch,
    Post,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    async signup(@Body() credentials: AuthDto) {
        return await this.authService.signup(credentials);
    }

    @Post('/login')
    @UsePipes(ValidationPipe)
    async login(@Body() credentials: AuthDto) {
        return await this.authService.login(credentials);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/change-password')
    @UsePipes(ValidationPipe)
    async changePassword(
        @Req() req: any,
        @Body() passwords: ChangePasswordDto,
    ) {
        return await this.authService.changePassword(req.user, passwords);
    }
}
