import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    userName: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
