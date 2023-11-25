import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Post } from "../post/post.model";
import { User } from "../user/user.model";
import mongoose from "mongoose";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true})
    author: User;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true})
    post: Post;

    @Prop({ default: Date.now})
    creationDate: Date;

    @Prop({ required: true})
    content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
