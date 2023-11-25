import { Injectable } from "@nestjs/common";
import { Comment } from "src/core/entities/comment.entity";

@Injectable()

export class CommentUseCase {
    createComment(comment: Comment): Promise<Comment>{
        //TODO
        return
    }

    editComment(commentId: string, comment: Comment): Promise<Comment> {
        //TODO
        return
    }

    getComments(commentId: string){
        //TODO
        return
    }

    deleteComment(commentId: string) {
        //TODO
        return
    }
}
