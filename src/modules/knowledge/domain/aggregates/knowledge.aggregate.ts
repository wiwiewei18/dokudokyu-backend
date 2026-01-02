import { AggregateRoot } from 'src/shared/domain/base.aggregate';

interface KnowledgeProps {
  documentId: string;
  extractedContent: string;
  summary: string;
  createdAt: Date;
}

export class Knowledge extends AggregateRoot<string> {
  private _id: string;
  private props: KnowledgeProps;

  private constructor(id: string, props: KnowledgeProps) {
    super();
    this._id = id;
    this.props = props;
  }

  public static create(props: {
    documentId: string;
    extractedContent: string;
    summary: string;
  }): Knowledge {
    const id = crypto.randomUUID();
    const now = new Date();

    const knowledge = new Knowledge(id, {
      documentId: props.documentId,
      extractedContent: props.extractedContent,
      summary: props.summary,
      createdAt: now,
    });

    return knowledge;
  }

  get id(): string {
    return this._id;
  }

  get documentId(): string {
    return this.props.documentId;
  }

  get extractedContent(): string {
    return this.props.extractedContent;
  }

  get summary(): string {
    return this.props.summary;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
