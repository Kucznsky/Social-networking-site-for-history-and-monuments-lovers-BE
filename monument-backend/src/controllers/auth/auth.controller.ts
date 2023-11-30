import { Body, Controller, ForbiddenException, Get, Param, Post, Redirect } from '@nestjs/common';
import { RegisterDto } from 'src/core/dtos/auth/register.dto';
import { UserFactoryService } from 'src/use_cases/user/user-factory/user-factory.service';
import { UserUseCase } from 'src/use_cases/user/user-use-case/user.use-case';
import * as argon from 'argon2'
import { AuthUserResponseDto } from 'src/core/dtos/auth/auth-user-response.dto';
import { LoginDto } from 'src/core/dtos/auth/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserUseCase,
        private readonly userFactoryService: UserFactoryService
      ) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto){
        const userLoggingInResponse = new AuthUserResponseDto()
        try{
            const token = await this.userService.login(loginDto)
            userLoggingInResponse.jwtToken = token;
            userLoggingInResponse.success = true;
        } catch(error){
            console.log(error);
            userLoggingInResponse.success = false;
        }
        return userLoggingInResponse;
    };

    @Post('register')
    async register(@Body() authDto: RegisterDto){
        const hash = await argon.hash(authDto.password);
        const createdUserResponse = new AuthUserResponseDto();
        try{
            const newUser = this.userFactoryService.createUserObject(authDto, hash);
            const token = await this.userService.register(newUser);
            createdUserResponse.jwtToken = token;
            createdUserResponse.success = true;
        } catch(error){
            console.log(error);
            createdUserResponse.success = false;
            if(error.code === 11000){
                throw new ForbiddenException('credentials taken');
            } else {
                throw error;
            }
        }
        return createdUserResponse;
    };

    @Get('activate/:userId')
    @Redirect('http://localhost:3000', 302)
    activateAccount(@Param('userId') userId: string) {
        this.userService.activateUserAccount(userId);
    }
}
