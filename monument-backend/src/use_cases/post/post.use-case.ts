import { Injectable } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-service.abstract";
import { Post } from "src/core/entities/post.entity";

@Injectable()
export class PostUseCase {
    constructor(
        private readonly dataServices: IDataServices,
      ) {}
    
      public async createPost(post: Post): Promise<Post>{
        try{
            const createdPost = await this.dataServices.posts.create(post);
            
            return createdPost; 
        } catch (error) {
            throw error;
        }
      }

      public async editPost(postId: string, post: Post): Promise<Post>{
        try{
            const editedPost = await this.dataServices.posts.update(postId, post);
            
            return editedPost; 
        } catch (error) {
            throw error;
        }
      }

      public async getAllPosts(): Promise<Post[]> {
        try {
          const postList = await this.dataServices.posts.getAll();

          return postList
        }
        catch(error) {
          throw error;
        }
      }

      public async getPost(id: string): Promise<Post> {
        try {
          return this.dataServices.posts.getById(id);
        }
        catch(error) {
          throw error;
        }
      }

      public deletePost(id: string) {
        return this.dataServices.posts.delete(id)
      }
}
