import { Controller, Body, Post } from '@nestjs/common';
import { CreatePostResponseDto } from 'src/core/dtos/create-post-response.dto/create-post-response.dto';
import { PostDto } from 'src/core/dtos/post.dto/post.dto';
import { PostFactoryService } from 'src/use_cases/post/post-factory/post-factory.service';
import { PostUseCase } from 'src/use_cases/post/post.use-case';

@Controller('post')
export class PostController {
    constructor(
        private postServices: PostUseCase,
        private postFactoryService: PostFactoryService,
      ) {}

    @Post()
    async createPost(@Body() postDto: PostDto) {
        const createdPostResponse = new CreatePostResponseDto();
        try {
            const post = this.postFactoryService.createPost(postDto)
            const createdPost = await this.postServices.createPost(post)

            createdPostResponse.createdPost = createdPost;
            createdPostResponse.success = true;
        } catch (error) {
            createdPostResponse.success = false;
        }

        return createdPostResponse;
    }
}
