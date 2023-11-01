import { Prop } from "@nestjs/mongoose";
import { Post } from "../post/post.model";
import { User } from "../user/user.model";

export class CommentModel {
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
