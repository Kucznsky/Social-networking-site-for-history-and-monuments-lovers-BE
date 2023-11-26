import { Injectable } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-service.abstract";
import { PostListItemDto } from "src/core/dtos/post/posts-list-item.dto";
import { Post } from "src/core/entities/post.entity";

@Injectable()
export class PostUseCase {
    constructor(
        private readonly dataServices: IDataServices,
      ) {}
    
      async createPost(post: Post): Promise<Post>{
        try{
            const createdPost = await this.dataServices.posts.create(post);
            
            return createdPost; 
        } catch (error) {
            console.log(error)
            throw error;
        }
      }

      async editPost(postId: string, post: Post): Promise<Post>{
        try{
            const editedPost = await this.dataServices.posts.update(postId, post);
            
            return editedPost; 
        } catch (error) {
            console.log(error)
            throw error;
        }
      }

      async getAllPosts(): Promise<PostListItemDto[]> {
        try {
          const postList = await this.dataServices.posts.getAll();

          return postList
        }
        catch(error) {
          console.log(error)
          throw error;
        }
      }

      async getPost(id: string): Promise<Post> {
        try {
          return this.dataServices.posts.getById(id);
        }
        catch(error) {
          console.log(error)
          throw error;
        }
      }

      async deletePost(id: string) {
        return this.dataServices.posts.delete(id)
      }
}
