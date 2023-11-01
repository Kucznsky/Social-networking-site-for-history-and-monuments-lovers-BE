import { Category } from "../enums/category.enum";
import { Like } from "./like.entity";
import { User } from "./user.entity";
import { Comment } from "./comment.entity";

export class Post {
    id: string;
    category: Category;
    title: string;
    content: string;
    //For now localisation coordinates are string but maybe later I'll make a class for that
    localisation: string;
    published: Date;
    author: User
    // likes: Like[]
    // comments: Comment[]

    //modernPictures
    //oldPictures
}