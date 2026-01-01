import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { MarkContentProcessingStartedUseCase } from '../app/useCases/markContentProcessingStarted.useCase';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ContentProcessingStartedSubscriber {
  constructor(
    private readonly markContentProcessingStartedUseCase: MarkContentProcessingStartedUseCase,
    private readonly eventEmitter: EventEmitter2,
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
    this.eventEmitter.emit('document.status_updated', {
      documentId: event.documentId,
      status: 'PROCESSING',
      payload: {},
    });
  }
}
