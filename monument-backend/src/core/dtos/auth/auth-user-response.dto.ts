import { UserDto } from "../user/user.dto";

export class AuthUserResponseDto {
    success: boolean;
    user: UserDto;
}
