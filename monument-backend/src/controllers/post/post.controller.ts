import { Controller, Body, Post, Put, Param, Get } from '@nestjs/common';
import { CreatePostResponseDto } from '../../core/dtos/post/create-post-response.dto/create-post-response.dto';
import { CreatedPostDto } from 'src/core/dtos/post/created-post.dto';
import { PostFactoryService } from 'src/use_cases/post/post-factory/post-factory.service';
import { PostUseCase } from 'src/use_cases/post/post.use-case';
import { EditedPostDto } from 'src/core/dtos/post/edited-post.dto';

@Controller('post')
export class PostController {
    constructor(
        private postServices: PostUseCase,
        private postFactoryService: PostFactoryService,
      ) {}

    @Post()
    async createPost(@Body() postDto: CreatedPostDto) {
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

    // @Put(':id')
    // async editPost(@Param('id') postId: string, @Body() Post: EditedPostDto) {
    //     const editedPost = this.postFactoryService.editPost(postDto)
    //     this.postServices.
    // }

    @Get('all')
    async getAllPosts() {
        return this.postServices.getAllPosts();
    }

    @Get(':id')
    async getPost(@Param('id') postId: string) {
        return this.postServices.getPost(postId);
    }
}
