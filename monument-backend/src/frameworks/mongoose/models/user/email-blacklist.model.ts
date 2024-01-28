import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type EmailBlackListDocument = EmailBlackList & Document;

@Schema()
export class EmailBlackList {
    @Prop({ required: true, unique: true })
    email: string;
}

export const EmailBlackListSchema = SchemaFactory.createForClass(EmailBlackList);
