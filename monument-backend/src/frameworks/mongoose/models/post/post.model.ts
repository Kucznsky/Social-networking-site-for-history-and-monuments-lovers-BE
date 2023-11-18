import { Category } from "src/core/enums/category.enum";
import { User } from "../user/user.model";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Like } from "../like/like.model";
import { Comment } from "../comment/comment.model";

export type PostDocument = Post & Document;

@Schema()
export class Post {
    @Prop({ required: true})
    category: Category;

    @Prop({ required: true})
    title: string;

    @Prop()
    content: string;

    @Prop({ required: true})
    localisation: string;

    @Prop({ default: Date.now})
    published: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true})
    author: User;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Like'}])
    likes: Like[];

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}])
    comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);

