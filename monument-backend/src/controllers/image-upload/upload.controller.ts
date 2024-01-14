import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from 'src/use_cases/image-upload/image-upload/image-upload.service';

@Controller('upload')
export class UploadController {
    constructor(private readonly imageUploadService: ImageUploadService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile(
          new ParseFilePipe({
            validators: [
              new MaxFileSizeValidator({ maxSize: 1000000 }),
              new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
            ],
          }),
        )
        file: Express.Multer.File,
      ) {
        await this.imageUploadService.uploadFile(file.originalname, file.buffer);
      }
}
