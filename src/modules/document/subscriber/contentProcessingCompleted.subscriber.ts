import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { MarkContentProcessingCompletedUseCase } from '../app/useCases/markContentProcessingCompleted.useCase';

@Injectable()
export class ContentProcessingCompletedSubscriber {
  constructor(
    private readonly markContentProcessingCompletedUseCase: MarkContentProcessingCompletedUseCase,
  ) {}

  @RabbitSubscribe({
    exchange: 'content-processor.exchange',
    routingKey: 'content_processing.completed',
    queue: 'document.mark-content-processing-completed',
  })
  async handle(event: { documentId: string }) {
    await this.markContentProcessingCompletedUseCase.execute({
      documentId: event.documentId,
    });
  }
}
