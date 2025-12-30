import { IsNumber, IsString } from 'class-validator';

export class RequestDocumentUploadDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsNumber()
  size: number;
}
