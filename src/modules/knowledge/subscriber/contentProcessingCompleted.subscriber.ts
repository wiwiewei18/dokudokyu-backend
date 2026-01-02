import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { StoreKnowledgeUseCase } from '../app/useCases/storeKnowledge.useCase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ContentProcessingCompletedSubscriber {
  constructor(private readonly storeKnowledgeUseCase: StoreKnowledgeUseCase) {}

  @RabbitSubscribe({
    exchange: 'content-processor.exchange',
    routingKey: 'content_processing.completed',
    queue: 'knowledge.store-knowledge',
  })
  async handle(event: {
    documentId: string;
    extractedContent: string;
    summary: string;
  }) {
    await this.storeKnowledgeUseCase.execute({
      documentId: event.documentId,
      extractedContent: event.extractedContent,
      summary: event.summary,
    });
  }
}
