import { Module } from '@nestjs/common';
import { DataServiceModule } from 'src/service-modules/data-service/data-service.module';
import { PostFactoryService } from './post-factory/post-factory.service';
import { PostUseCase } from './post.use-case';

@Module({
    imports: [DataServiceModule],
    providers: [PostFactoryService, PostUseCase],
    exports: [PostFactoryService, PostUseCase],
})
export class PostUseCaseModule {}
