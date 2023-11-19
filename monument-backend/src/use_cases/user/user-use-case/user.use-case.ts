import { ForbiddenException, Injectable } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-service.abstract";
import { LoginDto } from "src/core/dtos/auth/login.dto";
import { User } from "src/core/entities/user.entity";
import * as argon from 'argon2'


@Injectable()

export class UserUseCase {
    constructor(
        private dataServices: IDataServices,
      ) {}

    async register(user: User) {
        try {
            const createdPost = this.dataServices.users.create(user)
            return createdPost
        } catch (error) {
            throw error
        }
    };

    async login(loginDto: LoginDto): Promise<User> {
        const user = await this.dataServices.users.getByEmail(loginDto.email)
        console.log(user)
        if(!user) {
            throw new ForbiddenException(`There's no user with this email`); 
        }
        const arePasswordsMatching = await argon.verify(user.passwordHash, loginDto.password)
        if(!arePasswordsMatching){
            throw new ForbiddenException(`Incorrect password`); 
        }
        return user;
    };
}
