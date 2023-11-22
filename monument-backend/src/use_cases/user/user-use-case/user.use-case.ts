import { ForbiddenException, Injectable } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-service.abstract";
import { LoginDto } from "src/core/dtos/auth/login.dto";
import { User } from "src/core/entities/user.entity";
import * as argon from 'argon2'
import { JwtService } from "@nestjs/jwt";
import { AccessTokenWrapperDto } from "src/core/dtos/auth/access-token-wrapper.dto";


@Injectable()

export class UserUseCase {
    constructor(
        private readonly dataServices: IDataServices, 
        private readonly jwtService: JwtService
      ) {}

    public async register(user: User): Promise<AccessTokenWrapperDto> {
        try {
            const createdUser = await this.dataServices.users.create(user)
            const token = await this.signToken(user.id, user.email)
            return {access_token: token}
        } catch (error) {
            throw error
        }
    };

    
    public async login(loginDto: LoginDto): Promise<AccessTokenWrapperDto> {
        const user = await this.dataServices.users.getByEmail(loginDto.email)
        if(!user) {
            throw new ForbiddenException(`There's no user with this email`); 
        }
        const arePasswordsMatching = await argon.verify(user.passwordHash, loginDto.password)
        if(!arePasswordsMatching){
            throw new ForbiddenException(`Incorrect password`); 
        }
        const token = await this.signToken(user.id, user.email);
        return {access_token: token}
    };

    private signToken(userId: string, email: string): Promise<string>{
        const payload = { sub: userId, email: email }
        const options = { expiresIn: '45m', secret: 'blb'}
        
        return this.jwtService.signAsync(payload, options)
    }
}
