import { IsNotEmpty } from "class-validator";

export class LikeDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    userId: any;
}
