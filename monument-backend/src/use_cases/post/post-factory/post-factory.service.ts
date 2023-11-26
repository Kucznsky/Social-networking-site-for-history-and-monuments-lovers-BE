import { Injectable } from '@nestjs/common';
import { PostDto } from 'src/core/dtos/post/post.dto';
import { PostListItemDto } from 'src/core/dtos/post/posts-list-item.dto';
import { Like } from 'src/core/entities/like.entity';
import { Comment } from 'src/core/entities/comment.entity';
import { Post } from 'src/core/entities/post.entity';

@Injectable()
export class PostFactoryService {
    public createPostObject(postDto: PostDto): Post {
        const post = new Post();
        post.title = postDto.title;
        post.author = postDto.authorId;
        post.category = postDto.category;
        post.content = postDto.content;
        post.localisation = postDto.localisation;
        post.published = new Date(Date.now())
        return post
    }
}
