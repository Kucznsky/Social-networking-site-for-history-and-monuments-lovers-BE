import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/core/dtos/auth/register.dto';
import { UserDto } from 'src/core/dtos/user/user.dto';
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
        //profilePicture
        return user
    }

    // public createAuthResponseDto(user: User): UserDto {
    //     const newUserResponseDto = new UserDto();
    //     newUserResponseDto.email = user.email;
    //     newUserResponseDto.userName = user.userName;
    //     newUserResponseDto.isStaff = user.isStaff;
    //     newUserResponseDto.isAdmin = user.isAdmin;
    //     newUserResponseDto.isActive = user.isActive;
    //     return newUserResponseDto
    // }
}
