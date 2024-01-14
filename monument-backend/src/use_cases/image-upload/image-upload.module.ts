import { Module } from '@nestjs/common';
import { ImageUploadService } from './image-upload/image-upload.service';
import { DataServiceModule } from 'src/service-modules/data-service/data-service.module';

@Module({
  imports: [DataServiceModule],
  providers: [ImageUploadService],
  exports: [ImageUploadService],
})
export class ImageUploadModule {}
