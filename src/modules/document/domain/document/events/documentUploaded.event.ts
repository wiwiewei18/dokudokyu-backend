import { DomainEvent } from 'src/shared/domain/base.event';

export class DocumentUploadedEvent extends DomainEvent {
  constructor(
    public readonly documentId: string,
    public readonly storagePath: string,
    public readonly type: string,
  ) {
    super();
  }

  getEventName(): string {
    return 'document.uploaded';
  }
}
