import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";

export class UserDto {
    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsDate()
    @IsNotEmpty()
    dateOfJoining: Date;

    @IsBoolean()
    @IsNotEmpty()
    isStaff: boolean;

    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;
}

