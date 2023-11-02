import { Module } from '@nestjs/common';
import { MongoDataServicesModule } from 'src/frameworks/mongoose/data-service/mongo-data-service.module';

@Module({
    imports: [MongoDataServicesModule],
    exports: [MongoDataServicesModule],
})
export class DataServiceModule {}

// this module acts as a middleman between database logic and business logic 
// currently this application is using mongoDB, but if I would like to change
// it for another database, the only thing I'd have to do is to replace MongoDataServicesModule
// for a module with services for another DB