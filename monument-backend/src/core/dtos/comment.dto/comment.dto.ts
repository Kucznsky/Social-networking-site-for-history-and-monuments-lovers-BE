import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CommentDto {
    @IsNotEmpty()
    id: string

    @IsNotEmpty()
    authorId: any;
    
    @IsNotEmpty()
    postId: any;

    @IsNotEmpty()
    @IsDate()
    creationDate: Date;

    @IsNotEmpty()
    @IsString()
    content: string;
}
