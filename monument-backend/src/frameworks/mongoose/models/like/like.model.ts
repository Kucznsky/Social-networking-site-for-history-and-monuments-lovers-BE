import { Prop } from "@nestjs/mongoose";
import { User } from "../user/user.model";

export class Like {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true})
    user: User;
}
