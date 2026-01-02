import { IsString } from 'class-validator';

export class CompleteDocumentUploadDto {
  @IsString()
  documentId: string;
}
