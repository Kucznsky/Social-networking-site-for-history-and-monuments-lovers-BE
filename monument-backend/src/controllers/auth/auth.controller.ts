import { Controller, Post } from '@nestjs/common';
import { AuthUseCase } from 'src/use_cases/auth/auth.use-case';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthUseCase,
      ) {}

    @Post('login')
    login(){
        return this.authService.login()
    };

    @Post('register')
    register(){
        return this.authService.register()
    };
}
