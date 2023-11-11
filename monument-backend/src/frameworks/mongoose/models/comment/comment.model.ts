import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Post } from "../post/post.model";
import { User } from "../user/user.model";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true})
    author: User;

    @Prop({ required: true})
    post: Post;

    @Prop()
    creationDate: Date;

    @Prop({ required: true})
    content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
