import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostController } from './controllers/post/post.controller';
import { LikeController } from './controllers/like/like.controller';
import { UserController } from './controllers/user/user.controller';
import { CommentController } from './controllers/comment/comment.controller';
import { DataServiceModule } from './service-modules/data-service/data-service.module';
import { PostUseCaseModule, UserUseCaseModule, CommentUseCaseModule, LikeUseCaseModule } from './use_cases/index'
import { AuthController } from './controllers/auth/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import { ImageUploadModule } from './use_cases/image-upload/image-upload.module';
import { UploadController } from './controllers/image-upload/upload.controller';

@Module({
  imports: [ 
    ConfigModule.forRoot({isGlobal: true,}),
    DataServiceModule, 
    PostUseCaseModule, 
    UserUseCaseModule, 
    CommentUseCaseModule, 
    LikeUseCaseModule,
    ImageUploadModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: configService.get('MONUMENT_EMAIL_USER'),
            pass: configService.get('MONUMENT_EMAIL_PASSWORD'),
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, PostController, LikeController, UserController, CommentController, AuthController, UploadController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
