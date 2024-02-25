import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Category } from 'src/core/enums/category.enum';
import { LocalisationDto } from './localistation.dto';

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

    @IsNotEmpty()
    localisation: LocalisationDto;

    @IsNotEmpty()
    authorId: any;

    @IsString()
    @IsNotEmpty()
    thumbnail: string;

    oldPicutures?: string[];

    newPictures?: string[];
}
