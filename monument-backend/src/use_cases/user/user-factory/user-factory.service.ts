import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/core/dtos/auth/auth.dto';
import { User } from 'src/core/entities/user.entity';

@Injectable()
export class UserFactoryService {
    public createUserObject(userDto: AuthDto, hash: string): User {
        const user = new User();
        user.email = userDto.email;
        user.userName = userDto.userName;
        user.isStaff = false;
        user.isActive = false;
        user.passwordHash = hash;
        //profilePicture
        return user
    }
}
