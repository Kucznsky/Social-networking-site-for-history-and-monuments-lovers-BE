import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../user/user.model";

export type LikeDocument = Like & Document;

export class Like {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true})
    user: User;
}

export const LikeSchema = SchemaFactory.createForClass(Like);

