import { Injectable } from "@nestjs/common";
// import { ICRMServices } from "src/core/abstracts/crm-service.abstract";
import { IDataServices } from "src/core/abstracts/data-service.abstract";
import { Post } from "src/core/entities/post.entity";

@Injectable()
export class PostUseCase {
    constructor(
        private dataServices: IDataServices,
        // private crmServices: ICRMServices,
      ) {}
    
      async createPost(post: Post): Promise<Post>{
        try{
            const createdPost = await this.dataServices.posts.create(post);
            // console.log(createdPost);
            // await this.crmServices.postAdded(createdPost)
            
            return createdPost; 
        } catch (error) {
            console.log(error)
            throw error;
        }
      }
}
