import { UserDto } from "../user/user.dto";

export class CreateUserResponseDto {
    success: boolean;
    createdUser: UserDto;
}
