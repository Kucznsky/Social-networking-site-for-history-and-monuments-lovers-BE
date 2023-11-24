import { Injectable } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-service.abstract";
import { LikeDto } from "src/core/dtos/like/like.dto";
import { Like } from "src/core/entities/like.entity";

@Injectable()

export class LikeUseCase {
    constructor(
        private readonly dataServices: IDataServices,
      ) {}

    async createLike(like: Like): Promise<Like>{
        try{
            const createdLike = await this.dataServices.likes.create(like);
            return createdLike; 
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async deleteLike(likeDto: LikeDto) {
        try{
            const likedPost = await this.dataServices.posts.getById(likeDto.postId)
            const likeToRemove = likedPost.likes.find((like)=> like.user === likeDto.userId)
            return this.dataServices.likes.delete(likeToRemove.id)
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}
