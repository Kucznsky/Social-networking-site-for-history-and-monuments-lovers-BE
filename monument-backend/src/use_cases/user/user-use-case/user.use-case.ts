import { ForbiddenException, Injectable } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-service.abstract";
import { LoginDto } from "src/core/dtos/auth/login.dto";
import { User } from "src/core/entities/user.entity";
import * as argon from 'argon2'
import { JwtService } from "@nestjs/jwt";
import { AccessTokenWrapperDto } from "src/core/dtos/auth/access-token-wrapper.dto";
import { ConfigService } from "@nestjs/config";
import { UserDto } from "src/core/dtos/user/user.dto";


@Injectable()

export class UserUseCase {
    constructor(
        private readonly dataServices: IDataServices, 
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
      ) {}

    public async register(user: User): Promise<AccessTokenWrapperDto> {
        try {
            this.dataServices.users.create(user)
            const token = await this.signToken(user.id, user.email)
            return {access_token: token}
        } catch (error) {
            throw error
        }
    };

    
    public async login(loginDto: LoginDto): Promise<AccessTokenWrapperDto> {
        const user = await this.dataServices.users.getByEmail(loginDto.email);
        if(!user) {
            throw new ForbiddenException(`There's no user with this email`); 
        }
        const arePasswordsMatching = await argon.verify(user.passwordHash, loginDto.password);
        if(!arePasswordsMatching){
            throw new ForbiddenException(`Incorrect password`); 
        }
        const token = await this.signToken(user.id, user.email);
        return {access_token: token}
    };

    public getUserById(userId: string): Promise<User> {
        const user = this.dataServices.users.getById(userId)
        if(!user) {
            throw new ForbiddenException(`There's no user with this id`);
        }
        return user
    }

    public deleteUser(userId: string) {
        return this.dataServices.users.delete(userId);
    }

    public async updateUserData(userId: string, userDto: UserDto){
        let user = await this.dataServices.users.getById(userId)
        Object.keys(userDto).forEach((key)=>user[key] = userDto[key])
        this.dataServices.users.update(userId, user)
    }

    private signToken(userId: string, email: string): Promise<string>{
        const payload = { sub: userId, email: email };
        const options = { expiresIn: '7d', secret: this.config.get('JWT_SECRET')}; //just for debug purposes, later expiresIn needs to be changed later to the smaller value
        
        return this.jwtService.signAsync(payload, options)
    }
}
