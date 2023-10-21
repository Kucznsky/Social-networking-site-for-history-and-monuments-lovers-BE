import { Post } from "../entities/post.entity";
import { User } from "../entities/user.entity";
import { Comment } from "../entities/comment.entity";
import { IGenericRepository } from "./generic-repository.abstract";
import { Like } from "../entities/like.entity";

export abstract class IDataServices {
    abstract users: IGenericRepository<User>;
  
    abstract posts: IGenericRepository<Post>;
  
    abstract comments: IGenericRepository<Comment>;

    abstract likes: IGenericRepository<Like>
  }