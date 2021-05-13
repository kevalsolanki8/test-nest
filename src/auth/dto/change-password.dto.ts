import { IsString, IsNotEmpty } from 'class-validator';

export class ChangePasswordDto {
    @IsNotEmpty()
    @IsString()
    oldPassword: string;

    @IsNotEmpty()
    @IsString()
    newPassword: string;
}
