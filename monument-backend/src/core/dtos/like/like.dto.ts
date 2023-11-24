import { IsNotEmpty } from "class-validator";

export class LikeDto {
    @IsNotEmpty()
    userId: any;

    @IsNotEmpty()
    postId: any;
}
