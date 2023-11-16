import { Post } from '../../entities/post.entity';

export class CreatePostResponseDto {
    success: boolean;
    createdPost: Post;
}
