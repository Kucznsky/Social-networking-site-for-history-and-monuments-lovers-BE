import { Module } from '@nestjs/common';
import { DataServiceModule } from 'src/service-modules/data-service/data-service.module';
import { LikeFactoryService } from './like-factory/like-factory.service';
import { LikeUseCase } from './like-use-case/like.use-case';

@Module({
    imports: [DataServiceModule],
    providers: [LikeFactoryService, LikeUseCase],
    exports: [LikeFactoryService, LikeUseCase],
})
export class LikeUseCaseModule {}
