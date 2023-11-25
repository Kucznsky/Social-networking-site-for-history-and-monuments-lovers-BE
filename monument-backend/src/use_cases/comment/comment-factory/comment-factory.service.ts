import { Injectable } from '@nestjs/common';
import { CommentDto } from 'src/core/dtos/comment/comment.dto';
import { Comment } from 'src/core/entities/comment.entity';

@Injectable()
export class CommentFactoryService {
    createCommentObject(commentDto: CommentDto): Comment{
        const comment = new Comment();
        comment.author = commentDto.authorId;
        comment.content = commentDto.content;
        comment.post = commentDto.postId;

        return comment
    }
}
