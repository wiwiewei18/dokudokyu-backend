import { ConfigService } from '@nestjs/config';
import { IStorageService } from '../storage.service.interface';
import {
  HeadObjectCommand,
  HeadObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';

@Injectable()
export class R2StorageService implements IStorageService {
  private s3Client: S3Client;
  private bucket: string;

  constructor(private readonly configService: ConfigService) {
    const accountId = this.configService.get<string>('r2.accountId');
    const accessKeyId = this.configService.get<string>('r2.accessKeyId')!;
    const secretAccessKey =
      this.configService.get<string>('r2.secretAccessKey')!;
    this.bucket = this.configService.get<string>('r2.bucketName')!;
    const endpoint = `https://${accountId}.r2.cloudflarestorage.com`;

    this.s3Client = new S3Client({
      region: 'auto',
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async generatePresignedUploadUrl(
    storagePath: string,
    contentType: string,
  ): Promise<string> {
    const commandInput: PutObjectCommandInput = {
      Bucket: this.bucket,
      Key: storagePath,
      ContentType: contentType,
    };
    const command = new PutObjectCommand(commandInput);

    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 300 }); // 5 minutes
    return url;
  }

  async checkFileExists(storagePath: string): Promise<boolean> {
    const commandInput: HeadObjectCommandInput = {
      Bucket: this.bucket,
      Key: storagePath,
    };
    const command = new HeadObjectCommand(commandInput);

    try {
      await this.s3Client.send(command);
      return true;
    } catch (err: any) {
      if (err.name === 'NotFound' || err.$metadata?.httpStatusCode === 404) {
        return false;
      }
      throw err;
    }
  }
}
