import { Post } from '../../../../core/entities/post.entity';

export class CreatePostResponseDto {
    success: boolean;
    createdPost: Post;
}
