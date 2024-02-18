import { ForbiddenException, Injectable } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-service.abstract";
import { Comment } from "src/core/entities/comment.entity";

@Injectable()

export class CommentUseCase {
    constructor(
        private readonly dataServices: IDataServices,
    ) {}
      
    async createComment(comment: Comment): Promise<Comment>{
        const commentedPost = await this.dataServices.posts.getById(comment.post.toString())
        if(!commentedPost){
            throw new ForbiddenException(`Post doesn't exist`); 
        }
        commentedPost.numberOFComments += 1
        this.dataServices.posts.update(commentedPost.id, commentedPost)
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

    async deleteComment(commentId: string) {
        const commentToDelete = await this.dataServices.comments.getById(commentId)
        const commentedPost =  await this.dataServices.posts.getById(commentToDelete.post.toString())
        commentedPost.numberOFComments -= 1
        this.dataServices.posts.update(commentedPost.id, commentedPost)
        return this.dataServices.comments.delete(commentId)
    }
}
