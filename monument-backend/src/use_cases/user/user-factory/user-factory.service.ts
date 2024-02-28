import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/core/dtos/auth/register.dto';
import { UserResponseDto } from 'src/core/dtos/user/user-response.dto';
import { User } from 'src/core/entities/user.entity';

@Injectable()
export class UserFactoryService {
    public createUserObject(userDto: RegisterDto, hash: string): User {
        const user = new User();
        user.email = userDto.email;
        user.userName = userDto.userName;
        user.isStaff = false;
        user.isAdmin = false;
        user.isActive = false;
        user.passwordHash = hash;
        return user
    }

    public createUserDto(user: User): UserResponseDto {
        const userDto = new UserResponseDto()
        userDto.id = user.id;
        userDto.email = user.email;
        userDto.userName = user.userName;
        userDto.dateOfJoining = user.dateOfJoining;
        userDto.isStaff = user.isStaff;
        userDto.isAdmin = user.isAdmin;
        userDto.isActive = user.isActive;
        userDto.avatar = user.profilePicture

        return userDto;
    }
}
