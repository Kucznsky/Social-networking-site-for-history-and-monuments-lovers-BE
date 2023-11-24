import { ForbiddenException, Injectable } from "@nestjs/common";
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
        const listOfLikes = await this.dataServices.likes.getAll()
        const likeToRemove = listOfLikes.find((like)=> { return (like.post.toString() === likeDto.postId && like.user.toString() === likeDto.userId)})
        if(!likeToRemove){
            throw new ForbiddenException(`There's no like under this post added by this user`);
        }
        return this.dataServices.likes.delete(likeToRemove?.id)
    }
}
