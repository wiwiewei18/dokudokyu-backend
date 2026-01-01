import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RequestDocumentUploadUseCase } from '../app/useCases/requestDocumentUpload.useCase';
import { RequestDocumentUploadDto } from './dtos/requestDocumentUpload.dto';
import { AuthenticationGuard } from 'src/shared/guards/authentication.guard';
import { CompleteDocumentUploadUseCase } from '../app/useCases/completeDocumentUpload.useCase';
import { CompleteDocumentUploadDto } from './dtos/completeDocumentUpload.dto';
import { StreamDocumentStatusUseCase } from '../app/useCases/streamDocumentStatus.useCase';
import { type Response } from 'express';

@Controller('document')
export class DocumentController {
  constructor(
    private readonly requestDocumentUploadUseCase: RequestDocumentUploadUseCase,
    private readonly completeDocumentUploadUseCase: CompleteDocumentUploadUseCase,
    private readonly streamDocumentStatusUseCase: StreamDocumentStatusUseCase,
  ) {}

  @UseGuards(AuthenticationGuard)
  @Post('upload/request')
  async requestDocumentUpload(
    @Req() req,
    @Body() dto: RequestDocumentUploadDto,
  ) {
    return this.requestDocumentUploadUseCase.execute({
      userId: req.user.userId,
      name: dto.name,
      type: dto.type,
      size: dto.size,
    });
  }

  @UseGuards(AuthenticationGuard)
  @Post('upload/complete')
  async completeDocumentUpload(@Body() dto: CompleteDocumentUploadDto) {
    return this.completeDocumentUploadUseCase.execute({
      documentId: dto.documentId,
    });
  }

  @UseGuards(AuthenticationGuard)
  @Get(':documentId/stream-status')
  async streamDocumentStatus(
    @Param('documentId') documentId: string,
    @Res() res: Response,
  ) {
    return this.streamDocumentStatusUseCase.execute({ documentId }, res);
  }
}
