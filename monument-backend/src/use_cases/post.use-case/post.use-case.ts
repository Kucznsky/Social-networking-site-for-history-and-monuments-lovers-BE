import { ICRMServices } from "src/core/abstracts/crm-service.abstract";
import { IDataServices } from "src/core/abstracts/data-service.abstract";
import { Post } from "src/core/entities/post.entity";

export class PostUseCase {
    constructor(
        private dataServices: IDataServices,
        private crmServices: ICRMServices,
      ) {}
    
      async createPost(post: Post){
        try{
            const createdPost = await this.dataServices.posts.create(post);
            await this.crmServices.postAdded(createdPost)
            
            return createdPost; 
        } catch (error) {
            throw error;
        }
      }
}
