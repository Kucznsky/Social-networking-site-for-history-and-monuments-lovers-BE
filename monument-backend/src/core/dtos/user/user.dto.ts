import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsBoolean()
    @IsNotEmpty()
    isStaff: boolean;

    @IsBoolean()
    @IsNotEmpty()
    isAdmin: boolean;

    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;
}

