import { Post } from "./post.entity";
import { User } from "./user.entity";

export class Comment {
    author: User;
    post: Post;
    creationDate: Date;
    content: string;
}