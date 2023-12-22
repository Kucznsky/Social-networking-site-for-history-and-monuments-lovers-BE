import { ForbiddenException, Injectable } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-service.abstract";
import { LikeDto } from "src/core/dtos/like/like.dto";
import { Like } from "src/core/entities/like.entity";

@Injectable()

export class LikeUseCase {
    constructor(
        private readonly dataServices: IDataServices,
      ) {}

    async getUsersLikes(userId: string): Promise<Like[]> {
        const allLikes = await this.dataServices.likes.getAll()
        const filteredLikesByUserId = allLikes.filter((like)=>like.user.toString() === userId)
        return filteredLikesByUserId
    }

    async createLike(like: Like): Promise<Like>{
        const likedPost =  await this.dataServices.posts.getById(like.post.toString())
        if(!likedPost){
            throw new ForbiddenException(`Post doesn't exist`); 
        }
        const createdLike = await this.dataServices.likes.create(like);
        likedPost.numberOfLikes += 1
        this.dataServices.posts.update(likedPost.id, likedPost)
        return createdLike; 
    }

    async deleteLike(likeDto: LikeDto) {
        const listOfLikes = await this.dataServices.likes.getAll()
        const likeToRemove = listOfLikes.find((like)=> { return (like.post.toString() === likeDto.postId && like.user.toString() === likeDto.userId)})
        if(!likeToRemove){
            throw new ForbiddenException(`There's no like under this post added by this user`);
        }
        const likedPost =  await this.dataServices.posts.getById(likeDto.postId)
        likedPost.numberOfLikes -= 1
        return this.dataServices.likes.delete(likeToRemove?.id)
    }
}
