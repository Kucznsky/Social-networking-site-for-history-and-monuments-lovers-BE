import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, unique: true })
    userName: string;

    @Prop({ default: Date.now})
    dateOfJoining: Date;

    @Prop({ required: true})
    isStaff: boolean;

    @Prop({ required: true})
    isAdmin: boolean;
    
    @Prop({ required: true})
    isActive: boolean;

    @Prop({ required: true})
    passwordHash: string;

    @Prop()
    profilePicture?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

