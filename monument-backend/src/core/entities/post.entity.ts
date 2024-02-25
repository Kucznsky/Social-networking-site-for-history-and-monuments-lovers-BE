import { Category } from "../enums/category.enum";
import { Localisation } from "./localisation.entity";
import { User } from "./user.entity";

export class Post {
    id?: string
    category: Category;
    title: string;
    content: string;
    localisation: Localisation;
    published: Date;
    author: User
    numberOfLikes: number;
    numberOFComments: number;
    thumbnail: string

    modernPictures?: string[]
    oldPictures?: string[]
}