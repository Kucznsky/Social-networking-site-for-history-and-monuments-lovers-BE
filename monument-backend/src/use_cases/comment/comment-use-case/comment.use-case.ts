import { Injectable } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-service.abstract";
import { Comment } from "src/core/entities/comment.entity";

@Injectable()

export class CommentUseCase {
    constructor(
        private readonly dataServices: IDataServices,
    ) {}
      
    async createComment(comment: Comment): Promise<Comment>{
        const createdComment = await this.dataServices.comments.create(comment);
        return createdComment;
    }

    async editComment(commentId: string, comment: Comment): Promise<Comment> {
        const createdComment = await this.dataServices.comments.update(commentId, comment);
        return createdComment;
    }

    getComments(postId: string): Promise<Comment[]>{
        return this.dataServices.comments.getByPostId(postId)
    }

    deleteComment(commentId: string) {
        return this.dataServices.comments.delete(commentId)
    }
}
