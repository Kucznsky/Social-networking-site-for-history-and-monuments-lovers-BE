import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from 'src/use_cases/image-upload/image-upload/image-upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  @Post('/user-avatar/:userId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadUserAvatar(@Param('userId') userId: string,
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
      await this.imageUploadService.uploadUserAvatar(file.originalname, file.buffer, userId);
    }

  @Post('/post-thumbnail')
  @UseInterceptors(FileInterceptor('file'))
  async uploadThumbnail(
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
      return await this.imageUploadService.uploadPostThumbnail(file.originalname, file.buffer);
    }
}
