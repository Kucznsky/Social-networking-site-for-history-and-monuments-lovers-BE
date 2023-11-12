import { IsString, IsNotEmpty } from 'class-validator';
import { Category } from 'src/core/enums/category.enum';

export class EditedPostDto {
    @IsString()
    category: Category;

    @IsString()
    title: string;
    
    @IsString()
    content: string;
    localisation: string;
}
