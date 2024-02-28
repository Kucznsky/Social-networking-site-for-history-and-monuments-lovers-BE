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
import { use } from "passport";


@Injectable()

export class UserUseCase {
    constructor(
        private readonly dataServices: IDataServices, 
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
        private readonly mailerService: MailerService
      ) {}

    public async register(user: User): Promise<AccessTokenWrapperDto> {
        const blacklistedEmails = await this.dataServices.blacklistedEmails.getAll()
        if(blacklistedEmails.some((emailWrapper)=> emailWrapper.email === user.email)){
            throw new ForbiddenException(`This email was put on the black list`);
        }
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
        const blacklistedEmails = await this.dataServices.blacklistedEmails.getAll()
        if(!user) {
            if(blacklistedEmails.some((emailWrapper)=> emailWrapper.email === loginDto.email)){
                throw new ForbiddenException(`This account was banned due to violation of the regulations`);
            } else {
                throw new ForbiddenException(`There's no user with this email`); 
            }
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

    public async getUserByUserName(userName: string): Promise<User> {
        const user = this.dataServices.users.getByUserName(userName);
        if(!user) {
            throw new ForbiddenException(`There's no user with this user name`);
        }
        return user;
    }

    public async getAuthorsOfCommentsUnderPost(postId: string): Promise<User[]> {
        const comments = await this.dataServices.comments.getByPostId(postId)
        const users = await this.dataServices.users.getAll()
        return users.filter((user)=> comments.some((comment)=> comment.author.toString() === user.id))
    }

    public async deleteUser(userId: string) {
        const user = await this.dataServices.users.getById(userId);
        const likes = await this.dataServices.likes.getAll();
        const comments = await this.dataServices.comments.getAll();
        const posts = await this.dataServices.posts.getAll();
        this.dataServices.blacklistedEmails.create({email: user.email})
        posts.forEach((post)=>{
            if(post.author.toString() === user.id){
                this.dataServices.posts.delete(post.id)
            }
        })
        likes.forEach(async(like)=> {
            if(like.user.toString() === user.id){
                const relatedPost = await this.dataServices.posts.getById(like.post.toString())
                relatedPost.numberOfLikes -= 1
                this.dataServices.posts.update(relatedPost.id, relatedPost)
                this.dataServices.likes.delete(like.id)
            }
        })
        comments.forEach(async(comment)=> {
            if(comment.author.toString() === user.id){
                const relatedPost = await this.dataServices.posts.getById(comment.post.toString())
                relatedPost.numberOFComments -= 1
                this.dataServices.posts.update(relatedPost.id, relatedPost)
                this.dataServices.comments.delete(comment.id)
            }
        })

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
        const options = { expiresIn: '1h', secret: this.config.get('JWT_SECRET')}; 
        
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
