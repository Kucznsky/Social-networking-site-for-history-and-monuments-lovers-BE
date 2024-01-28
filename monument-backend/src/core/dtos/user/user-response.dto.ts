import { UserDto } from "./user.dto";

export class UserResponseDto extends UserDto {
    id: string;
    dateOfJoining: Date;
    avatar?: string;
}