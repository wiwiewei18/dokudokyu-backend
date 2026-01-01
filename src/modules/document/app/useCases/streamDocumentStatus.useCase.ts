import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';

export interface StreamDocumentStatusInput {
  documentId: string;
}

@Injectable()
export class StreamDocumentStatusUseCase {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async execute(
    input: StreamDocumentStatusInput,
    res: Response,
  ): Promise<void> {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    let counter = 0;
    const sendEvent = (status: string, payload?: any) => {
      counter++;
      const data = JSON.stringify({ status, ...payload });
      res.write(`id: ${counter}\ndata: ${data}\n\n`);
    };

    const statusUpdatedListener = (event: any) => {
      if (event.documentId === input.documentId) {
        sendEvent(event.status, event.payload);
      }
    };

    this.eventEmitter.on('document.status_updated', statusUpdatedListener);

    const heartbeat = setInterval(() => res.write(': keep-alive\n\n'), 15000);

    res.on('close', () => {
      clearInterval(heartbeat);
      this.eventEmitter.off('document.status_updated', statusUpdatedListener);
      res.end();
    });
  }
}
