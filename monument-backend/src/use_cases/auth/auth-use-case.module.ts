import { Module } from "@nestjs/common";
import { DataServiceModule } from "src/service-modules/data-service/data-service.module";
import { AuthUseCase } from "./auth.use-case";

@Module({
    imports: [DataServiceModule, AuthUseCase],
    providers: [AuthUseCase],
    exports: [AuthUseCase],
})
export class AuthUseCaseModule {}
