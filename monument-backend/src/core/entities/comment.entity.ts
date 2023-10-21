import { User } from "./user.entity";

export class Comment {
    author: User;
    postId: string;
    creationDate: Date;
    content: string;
}