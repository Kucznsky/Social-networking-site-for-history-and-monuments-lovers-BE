import { Injectable } from '@nestjs/common';
import { PostDto } from 'src/core/dtos/post.dto/post.dto';
import { Post } from 'src/core/entities/post.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostFactoryService {
    public createPost(postDto: PostDto): Post{
        const post = new Post();
        post.id = uuidv4();
        post.title = postDto.title;
        post.author = postDto.authorId;
        post.category = postDto.category;
        post.content = postDto.content;
        post.localisation = postDto.localisation;
        post.published = new Date(Date.now())
        return post
    }
}
