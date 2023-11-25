import { Post } from "../entities/post.entity";
import { User } from "../entities/user.entity";
import { Comment } from "../entities/comment.entity";
import { IGenericRepository } from "./generic-repository.abstract";
import { Like } from "../entities/like.entity";
import { IUserGenericRepository } from "./user-generic-repository.abstract";
import { ICommentGenericRepository } from "./comment-generic-repository.abstract";

export abstract class IDataServices {
    abstract users: IUserGenericRepository<User>;
  
    abstract posts: IGenericRepository<Post>;
  
    abstract comments: ICommentGenericRepository<Comment>;

    abstract likes: IGenericRepository<Like>
  }