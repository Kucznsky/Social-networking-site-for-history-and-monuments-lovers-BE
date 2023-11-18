import { User } from "src/core/entities/user.entity";

export class CreateUserResponseDto {
    success: boolean;
    createdUser: User;
}
