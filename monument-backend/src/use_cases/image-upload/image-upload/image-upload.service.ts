import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDataServices } from 'src/core/abstracts/data-service.abstract';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImageUploadService {

  private readonly s3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_S3_REGION'),
  });
  
  constructor(private readonly configService: ConfigService, private readonly dataService: IDataServices) {}

  public async uploadUserAvatar(originalFileName: string, file: Buffer, userId: string) {
    const user = await this.dataService.users.getById(userId)
    const fileName = `${uuidv4()}-${originalFileName}`
    const encodedFileName = encodeURIComponent(fileName)
    this.uploadFile(fileName, file).then((resoponse)=>{
      if(resoponse.$metadata.httpStatusCode === 200){
        user.profilePicture = this.buildUrlToImage(encodedFileName)
        this.dataService.users.update(userId, user)
      }
    })
  }

  public async uploadPostThumbnail(originalFileName: string, file: Buffer): Promise<string> {
    const fileName = `${uuidv4()}-${originalFileName}`
    const encodedFileName = encodeURIComponent(fileName)
    try{
      this.uploadFile(fileName, file)
    } catch(error){
      return error
    }
    return this.buildUrlToImage(encodedFileName)
  }
  
  private async uploadFile(fileName: string, file: Buffer) {
      return await this.s3Client.send(
          new PutObjectCommand({
              Bucket: this.configService.get('BUCKET_NAME'),
              Key: fileName,
              Body: file,
          }),
      );
  }

  private buildUrlToImage(fileName: string): string {
    return `https://${this.configService.get('BUCKET_NAME')}.s3.${this.configService.get('AWS_S3_REGION')}.amazonaws.com/${fileName}`
  }
}
