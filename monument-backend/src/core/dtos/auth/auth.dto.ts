import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
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
