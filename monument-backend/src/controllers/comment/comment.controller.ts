import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentResponseDto } from 'src/core/dtos/comment/comment-response.dto';
import { CommentDto } from 'src/core/dtos/comment/comment.dto';
import { CommentFactoryService } from 'src/use_cases/comment/comment-factory/comment-factory.service';
import { CommentUseCase } from 'src/use_cases/comment/comment-use-case/comment.use-case';

@Controller('comment')
export class CommentController {
    constructor(
        private commentService: CommentUseCase,
        private commentFactoryService: CommentFactoryService,
      ) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createComment(@Body() commentDto: CommentDto) {
        const createdCommentResponse = new CommentResponseDto();
        try {
            const comment = this.commentFactoryService.createCommentObject(commentDto);
            const createdComment = await this.commentService.createComment(comment);

            createdCommentResponse.createdComment = createdComment;
            createdCommentResponse.success = true;
        } catch (error) {
            createdCommentResponse.success = false;
        }

        return createdCommentResponse;
    }

    @Put(':commentId')
    @UseGuards(AuthGuard('jwt'))
    async editComment(@Param('commentId') commentId: string, @Body() commentDto: CommentDto) {
        const editedCommentResponse = new CommentResponseDto();
        try {
            const comment = this.commentFactoryService.createCommentObject(commentDto);
            const editedComment = await this.commentService.editComment(commentId, comment);

            editedCommentResponse.createdComment = editedComment;
            editedCommentResponse.success = true;
        } catch (error) {
            editedCommentResponse.success = false;
        }
        return editedCommentResponse;
    }

    @Get(':postId')
    getComments(){
        //TODO
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deleteComment(@Param('id') commentId: string) {
        return this.commentService.deleteComment(commentId)
    }
}
