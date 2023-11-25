import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CommentDto {
    @IsNotEmpty()
    authorId: any;
    
    @IsNotEmpty()
    postId: any;
    
    @IsNotEmpty()
    @IsString()
    content: string;
}
