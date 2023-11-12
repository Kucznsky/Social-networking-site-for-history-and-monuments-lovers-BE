import { Injectable } from '@nestjs/common';
import { CreatedPostDto } from 'src/core/dtos/post/created-post.dto';
import { EditedPostDto } from 'src/core/dtos/post/edited-post.dto';
import { Post } from 'src/core/entities/post.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostFactoryService {
    public createPost(postDto: CreatedPostDto): Post {
        const post = new Post();
        post.title = postDto.title;
        post.author = postDto.authorId;
        post.category = postDto.category;
        post.content = postDto.content;
        post.localisation = postDto.localisation;
        post.published = new Date(Date.now())
        return post
    }

    public editPost(postDto: EditedPostDto): Post {
        const post = new Post();
        Object.keys(postDto).forEach((key)=> {if(key){key.valueOf}})
        return post
    }
}
