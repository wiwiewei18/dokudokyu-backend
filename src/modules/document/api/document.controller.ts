import { Body, Controller, Post } from '@nestjs/common';
import { RequestDocumentUploadUseCase } from '../app/useCases/requestDocumentUpload.useCase';
import { RequestDocumentUploadDto } from './dtos/requestDocumentUpload.dto';

@Controller('document')
export class DocumentController {
  constructor(
    private readonly requestDocumentUploadUseCase: RequestDocumentUploadUseCase,
  ) {}

  @Post('upload/request')
  async requestDocumentUpload(@Body() dto: RequestDocumentUploadDto) {
    return this.requestDocumentUploadUseCase.execute({
      userId: 'user-id',
      name: dto.name,
      type: dto.type,
      size: dto.size,
    });
  }
}
