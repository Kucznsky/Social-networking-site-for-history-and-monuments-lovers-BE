import { IsString, IsNotEmpty, isNotEmpty, IsNumber } from 'class-validator';
import { Category } from 'src/core/enums/category.enum';

export class PostListItemDto {
    @IsString()
    @IsNotEmpty()
    category: Category;

    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    @IsNotEmpty()
    localisation: string;

    @IsNumber()
    @IsNotEmpty()
    numberOfLikes: number;

    @IsNumber()
    @IsNotEmpty()
    numberOfComments: number;
}