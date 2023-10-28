import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { Category } from 'src/core/enums/category.enum';

export class PostDto {

    @IsString()
    @IsNotEmpty()
    category: Category;

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
