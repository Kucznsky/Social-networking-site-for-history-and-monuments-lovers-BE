import { Module } from '@nestjs/common';
import { DataServiceModule } from 'src/service-modules/data-service/data-service.module';
import { UserFactoryService } from './user-factory/user-factory.service';
import { UserUseCase } from './user-use-case/user.use-case';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [DataServiceModule, JwtModule.register({})],
    providers: [UserFactoryService, UserUseCase],
    exports: [UserFactoryService, UserUseCase],
})
export class UserUseCaseModule {}
