import { Prop, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

export class User {
    @Prop({ required: true, unique: true })
    id: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, unique: true })
    userName: string;

    @Prop()
    dateOfJoining: Date;

    @Prop({ required: true})
    isStaff: boolean;
    
    @Prop({ required: true})
    isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

