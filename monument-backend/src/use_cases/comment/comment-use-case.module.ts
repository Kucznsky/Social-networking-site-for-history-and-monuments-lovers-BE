import { Module } from '@nestjs/common';
import { DataServiceModule } from 'src/service-modules/data-service/data-service.module';
import { CommentFactoryService } from './comment-factory/comment-factory.service';
import { CommentUseCase } from './comment-use-case/comment.use-case';

@Module({
    imports: [DataServiceModule],
    providers: [CommentFactoryService, CommentUseCase],
    exports: [CommentFactoryService, CommentUseCase],
})
export class CommentUseCaseModule {}
