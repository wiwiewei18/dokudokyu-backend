import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { MarkContentProcessingStartedUseCase } from '../app/useCases/markContentProcessingStarted.useCase';

@Injectable()
export class ContentProcessingStartedSubscriber {
  constructor(
    private readonly markContentProcessingStartedUseCase: MarkContentProcessingStartedUseCase,
  ) {}

  @RabbitSubscribe({
    exchange: 'content-processor.exchange',
    routingKey: 'content_processing.started',
    queue: 'document.mark-content-processing-started',
  })
  async handle(event: { documentId: string }) {
    await this.markContentProcessingStartedUseCase.execute({
      documentId: event.documentId,
    });
  }
}
