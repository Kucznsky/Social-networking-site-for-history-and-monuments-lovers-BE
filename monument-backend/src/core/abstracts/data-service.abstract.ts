import { Post } from "../entities/post.entity";
import { User } from "../entities/user.entity";
import { Comment } from "../entities/comment.entity";
import { IGenericRepository } from "./generic-repository.abstract";
import { Like } from "../entities/like.entity";
import { EmailBlackList } from "../entities/email-blacklist.entity";
import { IUserGenericRepository } from "./user-generic-repository.abstract";
import { ILikeCommentGenericRepository } from "./like-comment-generic-repository.abstract";

export abstract class IDataServices {
  abstract users: IUserGenericRepository<User>;
  abstract posts: IGenericRepository<Post>;
  abstract comments: ILikeCommentGenericRepository<Comment>;
  abstract likes: ILikeCommentGenericRepository<Like>
  abstract blacklistedEmails: IGenericRepository<EmailBlackList>
}