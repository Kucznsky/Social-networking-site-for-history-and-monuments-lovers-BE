import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImageUploadService {

    private readonly s3Client = new S3Client({
        region: this.configService.getOrThrow('AWS_S3_REGION'),
    });
    
    constructor(private readonly configService: ConfigService) {}
    
    async uploadFile(fileName: string, file: Buffer) {
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: this.configService.get('BUCKET_NAME'),
                Key: fileName,
                Body: file,
            }),
        );
    }
}
