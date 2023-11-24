import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../user/user.model";
import { Post } from "../post/post.model";
import mongoose from "mongoose";

export type LikeDocument = Like & Document;

@Schema()
export class Like {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true})
    user: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true})
    post: Post;
}

export const LikeSchema = SchemaFactory.createForClass(Like);

