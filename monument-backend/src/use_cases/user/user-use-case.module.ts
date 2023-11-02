import { Module } from '@nestjs/common';
import { DataServiceModule } from 'src/service-modules/data-service/data-service.module';
import { UserFactoryService } from './user-factory/user-factory.service';
import { UserUseCase } from './user-use-case/user.use-case';

@Module({
    imports: [DataServiceModule],
    providers: [UserFactoryService, UserUseCase],
    exports: [UserFactoryService, UserUseCase],
})
export class UserUseCaseModule {}
