import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LikeDto } from 'src/core/dtos/like/like.dto';
import { LikeFactoryService } from 'src/use_cases/like/like-factory/like-factory.service';
import { LikeUseCase } from 'src/use_cases/like/like-use-case/like.use-case';

@UseGuards(AuthGuard('jwt'))
@Controller('like')
export class LikeController {
    constructor(
        private readonly likeService: LikeUseCase,
        private readonly likeFactoryService: LikeFactoryService,
      ) {}

    @Get(':userId')
    async getUsersLikes(@Param('userId') userId: string) {
        const fetchedLikes = await this.likeService.getUsersLikes(userId)
        return this.likeFactoryService.createLikeDto(fetchedLikes)
    }

    @Post()
    createLike(@Body() likeDto: LikeDto) {
        try {
            const like = this.likeFactoryService.createLikeObject(likeDto)
            this.likeService.createLike(like)
        } catch(error) {
            return error;
        }
    }

    @Post('remove')
    deleteLike(@Body() likeDto: LikeDto){
        try {
            this.likeService.deleteLike(likeDto)
        } catch(error) {
            return error
        }
    }
}
