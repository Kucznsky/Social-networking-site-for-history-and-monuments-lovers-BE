import { Category } from "../enums/category.enum";
import { User } from "./user.entity";

export class Post {
    id?: string
    category: Category;
    title: string;
    content: string;
    //For now localisation coordinates are string but maybe later I'll make a class for that
    localisation: string;
    published: Date;
    author: User
    numberOfLikes: number;
    numberOFComments: number;
    thumbnail: string

    modernPictures?: string[]
    oldPictures?: string[]
}