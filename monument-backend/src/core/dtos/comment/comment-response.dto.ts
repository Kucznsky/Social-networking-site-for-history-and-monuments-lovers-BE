import { Comment } from "src/core/entities/comment.entity";

export class CommentResponseDto {
    success: boolean;
    createdComment: Comment;
}