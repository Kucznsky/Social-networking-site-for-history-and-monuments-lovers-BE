import { IsString, IsNotEmpty } from 'class-validator';
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

    @IsString()
    @IsNotEmpty()
    localisation: string;

    @IsNotEmpty()
    authorId: any;

    @IsString()
    @IsNotEmpty()
    thumbnail: string;

    oldPicutures?: string[];

    newPictures?: string[];
}
