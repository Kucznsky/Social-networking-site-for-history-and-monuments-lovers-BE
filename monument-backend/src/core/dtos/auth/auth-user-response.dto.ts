import { UserDto } from "../user/user.dto";
import { AccessTokenWrapperDto } from "./access-token-wrapper.dto";

export class AuthUserResponseDto {
    success: boolean;
    jwtToken: AccessTokenWrapperDto;
}
