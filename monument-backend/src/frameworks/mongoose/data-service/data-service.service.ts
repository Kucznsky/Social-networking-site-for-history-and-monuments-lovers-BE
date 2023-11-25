import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts/data-service.abstract';
import { User, UserDocument } from '../models/user/user.model';
import { Post, PostDocument } from '../models/post/post.model';
import { Comment, CommentDocument } from '../models/comment/comment.model';
import { Like, LikeDocument } from '../models/like/like.model';
import { MongoGenericRepository } from '../generic-repositories/mongo-generic-repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoUserGenericRepository } from '../generic-repositories/mongo-user-generic-repository';
import { MongoLikeCommentGenericRepository } from '../generic-repositories/mongo-like-comment-generic-repository';

@Injectable()
export class DataService implements IDataServices, OnApplicationBootstrap  {
    users: MongoUserGenericRepository<User>;
    posts: MongoGenericRepository<Post>;
    comments: MongoLikeCommentGenericRepository<Comment>;
    likes: MongoLikeCommentGenericRepository<Like>;
  
    constructor(
      @InjectModel(Post.name)
      private PostRepository: Model<PostDocument>,
      @InjectModel(User.name)
      private UserRepository: Model<UserDocument>,
      @InjectModel(Comment.name)
      private CommentRepository: Model<CommentDocument>,
      @InjectModel(Like.name)
      private LikeRepository: Model<LikeDocument>,
    ) {}

    onApplicationBootstrap() {
        this.users = new MongoUserGenericRepository<User>(this.UserRepository);
        this.posts = new MongoGenericRepository<Post>(this.PostRepository);
        this.comments = new MongoLikeCommentGenericRepository<Comment>(this.CommentRepository);
        this.likes = new MongoLikeCommentGenericRepository<Like>(this.LikeRepository);
      }
}
