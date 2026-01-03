import { DomainEvent } from 'src/shared/domain/base.event';

export class KnowledgeStoredEvent extends DomainEvent {
  constructor(
    public readonly documentId: string,
    public readonly extractedContent: string,
    public readonly summary: string,
  ) {
    super();
  }

  getEventName(): string {
    return 'knowledge.stored';
  }
}
