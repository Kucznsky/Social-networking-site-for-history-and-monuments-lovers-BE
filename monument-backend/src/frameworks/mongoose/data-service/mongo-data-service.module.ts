import { Module } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts/data-service.abstract';
import { DataService } from './data-service.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../models/post/post.model';
import { User, UserSchema } from '../models/user/user.model';
import { Comment, CommentSchema } from '../models/comment/comment.model';
import { Like, LikeSchema } from '../models/like/like.model';
import { EmailBlackList } from 'src/core/entities/email-blacklist.entity';
import { EmailBlackListSchema } from '../models/user/email-blacklist.model';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URL'),
      }),
      inject: [ConfigService],}),
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: User.name, schema: UserSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: Like.name, schema: LikeSchema },
      { name: EmailBlackList.name, schema: EmailBlackListSchema}
    ]),
  ],
    providers: [
      {
        provide: IDataServices,
        useClass: DataService,
      },
    ],
    exports: [IDataServices],
  })
  export class MongoDataServicesModule {}
