import { ForbiddenException, Injectable } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-service.abstract";
import { LoginDto } from "src/core/dtos/auth/login.dto";
import { User } from "src/core/entities/user.entity";
import * as argon from 'argon2'
import { JwtService } from "@nestjs/jwt";
import { AccessTokenWrapperDto } from "src/core/dtos/auth/access-token-wrapper.dto";
import { ConfigService } from "@nestjs/config";
import { UserDto } from "src/core/dtos/user/user.dto";
import { MailerService } from "@nestjs-modules/mailer";


@Injectable()

export class UserUseCase {
    constructor(
        private readonly dataServices: IDataServices, 
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
        private readonly mailerService: MailerService
      ) {}

    public async register(user: User): Promise<AccessTokenWrapperDto> {
        try {
            const createdUser = await this.dataServices.users.create(user);
            this.sendEmail(createdUser.id, createdUser.email);
            const token = await this.signToken(user.id, user.email);
            return {access_token: token};
        } catch (error) {
            throw error;
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
        return {access_token: token};
    };

    public getUserById(userId: string): Promise<User> {
        const user = this.dataServices.users.getById(userId);
        if(!user) {
            throw new ForbiddenException(`There's no user with this id`);
        }
        return user;
    }

    public deleteUser(userId: string) {
        return this.dataServices.users.delete(userId);
    }

    public async updateUserData(userId: string, userDto: UserDto){
        let user = await this.dataServices.users.getById(userId);
        Object.keys(userDto).forEach((key)=>user[key] = userDto[key]);
        this.dataServices.users.update(userId, user);
    }

    public async activateUserAccount(userId: string) {
        const userToActivate = await this.dataServices.users.getById(userId);
        userToActivate.isActive = true;
        this.dataServices.users.update(userId, userToActivate);
    }

    private signToken(userId: string, email: string): Promise<string>{
        const payload = { sub: userId, email: email };
        const options = { expiresIn: '7d', secret: this.config.get('JWT_SECRET')}; //just for debug purposes, later expiresIn needs to be changed later to the smaller value
        
        return this.jwtService.signAsync(payload, options)
    }

    private sendEmail(userId: string, email: string){
        this.mailerService.sendMail({
            to: email,
            from: 'noreply@historyMonumentsLovers.com',
            subject: 'Email confirmation',
            text: 'Click the link below to confirm Your email address',
            html: `<p>Click the link below to confirm Your email address</p>` +
                    `</br>`+
                    `<a href="http://localhost:3000/auth/activate/${userId}">Confirm email</a>`,
      })
    }
}
