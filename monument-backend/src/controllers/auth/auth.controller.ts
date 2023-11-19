import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { AuthDto } from 'src/core/dtos/auth/auth.dto';
import { AuthUseCase } from 'src/use_cases/auth/auth.use-case';
import { UserFactoryService } from 'src/use_cases/user/user-factory/user-factory.service';
import { UserUseCase } from 'src/use_cases/user/user-use-case/user.use-case';
import * as argon from 'argon2'
import { CreateUserResponseDto } from 'src/core/dtos/auth/created-user-response.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthUseCase,
        private readonly userService: UserUseCase,
        private readonly userFactoryService: UserFactoryService
      ) {}

    @Post('login')
    login(){
        return this.authService.login();
    };

    @Post('register')
    async register(@Body() authDto: AuthDto){
        const hash = await argon.hash(authDto.password);
        const createdUserResponse = new CreateUserResponseDto();
        try{
            const newUser = this.userFactoryService.createUserObject(authDto, hash);
            const createdUser = await this.userService.register(newUser);
            createdUserResponse.createdUser = this.userFactoryService.createUserResponseDto(createdUser);
            createdUserResponse.success = true;
            console.log(createdUserResponse);
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
}
