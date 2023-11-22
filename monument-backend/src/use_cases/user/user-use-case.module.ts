import { Module } from '@nestjs/common';
import { DataServiceModule } from 'src/service-modules/data-service/data-service.module';
import { UserFactoryService } from './user-factory/user-factory.service';
import { UserUseCase } from './user-use-case/user.use-case';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [DataServiceModule, JwtModule.register({})],
    providers: [UserFactoryService, JwtStrategy ,UserUseCase],
    exports: [UserFactoryService, UserUseCase],
})
export class UserUseCaseModule {}
