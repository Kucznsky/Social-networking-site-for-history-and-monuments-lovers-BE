import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class PostDto {

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    @IsNotEmpty()
    content: string;
    localisation: string;

    @IsDate()
    published: Date;

    @IsNotEmpty()
    authorId: any;

    //likes
    //comments
}
