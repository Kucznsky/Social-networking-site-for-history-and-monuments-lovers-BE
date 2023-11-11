import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../user/user.model";

export type LikeDocument = Like & Document;

@Schema()
export class Like {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true})
    user: User;
}

export const LikeSchema = SchemaFactory.createForClass(Like);

