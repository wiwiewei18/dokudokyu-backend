import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { GetKnowledgeUseCase } from '../app/useCases/getKnowledge.useCase';
import { AuthenticationGuard } from 'src/shared/guards/authentication.guard';

@Controller('document/:documentId/knowledge')
export class KnowledgeController {
  constructor(private readonly getKnowledgeUseCase: GetKnowledgeUseCase) {}

  @UseGuards(AuthenticationGuard)
  @Get('')
  async getKnowledge(@Param('documentId') documentId: string) {
    return this.getKnowledgeUseCase.execute({ documentId });
  }
}
