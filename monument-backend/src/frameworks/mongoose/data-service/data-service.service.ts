import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts/data-service.abstract';
import { User, UserDocument } from '../models/user/user.model';
import { Post, PostDocument } from '../models/post/post.model';
import { MongoGenericRepository } from '../mongo-generic-repository/mongo-generic-repository';
import { InjectModel } from '@nestjs/mongoose';
import { Like, LikeDocument } from '../models/like/like.model';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from '../models/comment/comment.model';

@Injectable()
export class DataService implements IDataServices, OnApplicationBootstrap  {
    users: MongoGenericRepository<User>;
    posts: MongoGenericRepository<Post>;
    comments: MongoGenericRepository<Comment>;
    likes: MongoGenericRepository<Like>;
  
    constructor(
      @InjectModel(User.name)
      private UserRepository: Model<UserDocument>,
      @InjectModel(Post.name)
      private PostRepository: Model<PostDocument>,
      @InjectModel(Comment.name)
      private CommentRepository: Model<CommentDocument>,
      @InjectModel(Like.name)
      private LikeRepository: Model<LikeDocument>,
    ) {}

    onApplicationBootstrap() {
        this.users = new MongoGenericRepository<User>(this.UserRepository);
        this.posts = new MongoGenericRepository<Post>(this.PostRepository);
        this.comments = new MongoGenericRepository<Comment>(this.CommentRepository);
        this.likes = new MongoGenericRepository<Like>(this.LikeRepository);
      }
}
