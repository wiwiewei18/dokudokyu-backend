import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { MarkContentProcessingCompletedUseCase } from '../app/useCases/markContentProcessingCompleted.useCase';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ContentProcessingCompletedSubscriber {
  constructor(
    private readonly markContentProcessingCompletedUseCase: MarkContentProcessingCompletedUseCase,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @RabbitSubscribe({
    exchange: 'content-processor.exchange',
    routingKey: 'content_processing.completed',
    queue: 'document.mark-content-processing-completed',
  })
  async handle(event: {
    documentId: string;
    extractedContent: string;
    summary: string;
    keywords: string[];
    importantDates: {
      date: string;
      type: 'deadline' | 'meeting' | 'payment' | 'event' | 'other';
      description: string;
    }[];
    actions: string[];
  }) {
    await this.markContentProcessingCompletedUseCase.execute({
      documentId: event.documentId,
    });
    this.eventEmitter.emit('document.status_updated', {
      documentId: event.documentId,
      status: 'COMPLETED',
      payload: {
        extractedContent: event.extractedContent,
        summary: event.summary,
        keywords: event.keywords,
        importantDates: event.importantDates,
        actions: event.actions,
      },
    });
  }
}
