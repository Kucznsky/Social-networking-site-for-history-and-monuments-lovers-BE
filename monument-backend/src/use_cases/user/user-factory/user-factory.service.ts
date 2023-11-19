import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/core/dtos/auth/auth.dto';
import { UserDto } from 'src/core/dtos/user/user.dto';
import { User } from 'src/core/entities/user.entity';

@Injectable()
export class UserFactoryService {
    public createUserObject(userDto: AuthDto, hash: string): User {
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

    public createUserResponseDto(user: User): UserDto {
        const newUserResponseDto = new UserDto();
        newUserResponseDto.email = user.email;
        newUserResponseDto.userName = user.userName;
        newUserResponseDto.isStaff = user.isStaff;
        newUserResponseDto.isAdmin = user.isAdmin;
        newUserResponseDto.isActive = user.isActive;
        return newUserResponseDto
    }
}
