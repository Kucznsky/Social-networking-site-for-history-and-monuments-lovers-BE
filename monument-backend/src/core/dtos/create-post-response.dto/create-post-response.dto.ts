import { Post } from "src/core/entities/post.entity";

export class CreatePostResponseDto {
    success: boolean;
    createdPost: Post;
}
