import { Injectable } from '@nestjs/common';
import { PostDto } from 'src/core/dtos/post/post.dto';
import { PostListItemDto } from 'src/core/dtos/post/posts-list-item.dto';
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

    public async createListOfPostDtos(postList: Promise<Post[]>): Promise<PostListItemDto[]> {
        let postListDto: PostListItemDto[]
        postList.then((postList)=> {
            postListDto = postList.map((post)=>{
                let postListItem = new PostListItemDto;
                postListItem.title = post.title;
                postListItem.category = post.category;
                postListItem.localisation = post.category;
                postListItem.numberOfLikes = post.likes.length;
                postListItem.numberOfComments = post.comments.length;
                return postListItem 
            })
        })
        // const postListDto = postList.map((post)=>{
        //     let postListItem = new PostListItemDto;
        //     postListItem.title = post.title;
        //     postListItem.category = post.category;
        //     postListItem.localisation = post.category;
        //     postListItem.numberOfLikes = post.likes.length;
        //     postListItem.numberOfComments = post.comments.length;
        //     return postListItem
        // });
        return await postListDto;
    }
}
