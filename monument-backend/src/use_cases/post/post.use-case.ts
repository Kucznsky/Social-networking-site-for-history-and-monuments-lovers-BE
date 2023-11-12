import { Injectable } from "@nestjs/common";
// import { ICRMServices } from "src/core/abstracts/crm-service.abstract";
import { IDataServices } from "src/core/abstracts/data-service.abstract";
import { EditedPostDto } from "src/core/dtos/post/edited-post.dto";
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

      // async editPost(postId: string, post: Post): Promise<Post>{
      //   try{
      //       const createdPost = await this.dataServices.posts.update(postId, post);
      //       // console.log(createdPost);
      //       // await this.crmServices.postAdded(createdPost)
            
      //       return createdPost; 
      //   } catch (error) {
      //       console.log(error)
      //       throw error;
      //   }
      // }

      async getAllPosts(): Promise<Post[]> {
        try {
          return this.dataServices.posts.getAll();
        }
        catch(error) {
          console.log(error)
          throw error;
        }
      }

      async getPost(id: string): Promise<Post> {
        try {
          return this.dataServices.posts.get(id);
        }
        catch(error) {
          console.log(error)
          throw error;
        }
      }
}
