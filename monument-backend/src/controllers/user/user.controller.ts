import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from 'src/core/dtos/user/user.dto';
import { UserFactoryService } from 'src/use_cases/user/user-factory/user-factory.service';
import { UserUseCase } from 'src/use_cases/user/user-use-case/user.use-case';

@Controller('user')
export class UserController {
    constructor(
        private userServices: UserUseCase,
        private readonly userFactoryService: UserFactoryService,
      ) {}

    @Get('commented-post/:postId')
    async getAuthorsOfCommentsUnderPost(@Param('postId') postId: string){
        try{
            const users = await this.userServices.getAuthorsOfCommentsUnderPost(postId)
            const usersDtos = users.map((user)=>this.userFactoryService.createUserDto(user))
            return usersDtos
        } catch(error) {
            return error
        }
    }

    @Get(':userId')
    async getUserById(@Param('userId') userId: string){
        try{
            const user = await this.userServices.getUserById(userId)
            return this.userFactoryService.createUserDto(user)
        } catch(error) {
            return error
        }
    }

    @Get('userName/:userName')
    async getUsersByUsername(@Param('userName') userName: string){
        try{
            const user = await this.userServices.getUserByUserName(userName)
            return this.userFactoryService.createUserDto(user)
        } catch(error) {
            return error
        }
    }

    @Put(':userId')
    @UseGuards(AuthGuard('jwt'))
    async editUserData(@Param('userId') userId: string, @Body() userDto: UserDto) {
        this.userServices.updateUserData(userId, userDto)
    }

    @Delete(':userId')
    @UseGuards(AuthGuard('jwt'))
    deleteUser(@Param('userId') userId: string) {
        return this.userServices.deleteUser(userId)
    }
}
