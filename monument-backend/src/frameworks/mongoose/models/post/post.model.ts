import { Category } from "src/core/enums/category.enum";
import { User } from "../user/user.model";
import { Prop, SchemaFactory } from "@nestjs/mongoose";

export type PostDocument = Post & Document;

export class Post {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true})
    category: Category;

    @Prop({ required: true})
    title: string;

    @Prop()
    content: string;

    @Prop({ required: true})
    localisation: string;

    @Prop()
    published: Date;

    @Prop({ required: true})
    author: User

    // @Prop()
    // // likes: Like[]

    // @Prop()
    // // comments: Comment[]
}

export const BookSchema = SchemaFactory.createForClass(Post);

