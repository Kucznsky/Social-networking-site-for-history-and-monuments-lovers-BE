import { Post } from "./post.entity";
import { User } from "./user.entity";

export class Like {
    id?: string;
    user: User;
    post: Post;
}