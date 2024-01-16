import { Controller, Body, Post, Put, Param, Get, Delete, UseGuards } from '@nestjs/common';
import { CreatePostResponseDto } from '../../core/dtos/post/create-post-response.dto';
import { PostDto } from 'src/core/dtos/post/post.dto';
import { PostFactoryService } from 'src/use_cases/post/post-factory/post-factory.service';
import { PostUseCase } from 'src/use_cases/post/post.use-case';
import { EditPostResponseDto } from 'src/core/dtos/post/edit-post-response.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('post')
export class PostController {
    constructor(
        private postServices: PostUseCase,
        private postFactoryService: PostFactoryService,
      ) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createPost(@Body() postDto: PostDto) {
        const createdPostResponse = new CreatePostResponseDto();
        try {
            const post = this.postFactoryService.createPostObject(postDto);
            const createdPost = await this.postServices.createPost(post);

            createdPostResponse.createdPost = createdPost;
            createdPostResponse.success = true;
        } catch (error) {
            console.log(error)
            createdPostResponse.success = false;
        }

        return createdPostResponse;
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async editPost(@Param('id') postId: string, @Body() postDto: PostDto) {
        const editedPostResponse = new EditPostResponseDto();
        try {
            const post = this.postFactoryService.createPostObject(postDto);
            const editedPost = await this.postServices.editPost(postId, post);

            editedPostResponse.createdPost = editedPost;
            editedPostResponse.success = true;
        } catch (error) {
            editedPostResponse.success = false;
        }
        return editedPostResponse;
    }

    @Get('all')
    getAllPosts() {
        return this.postServices.getAllPosts();
    }

    @Get(':id')
    async getPost(@Param('id') postId: string) {
        return this.postServices.getPost(postId);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deletePost(@Param('id') postId: string) {
        return this.postServices.deletePost(postId)
    }
}
