import { AggregateRoot } from 'src/shared/domain/base.aggregate';
import { KnowledgeImportantDate } from '../valueObjects/knowledgeImportantDate.vo';

interface KnowledgeProps {
  documentId: string;
  extractedContent: string;
  summary: string;
  keywords: string[];
  importantDates: KnowledgeImportantDate[];
  actions: string[];
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
    keywords: string[];
    importantDates: KnowledgeImportantDate[];
    actions: string[];
  }): Knowledge {
    const id = crypto.randomUUID();
    const now = new Date();

    const knowledge = new Knowledge(id, {
      documentId: props.documentId,
      extractedContent: props.extractedContent,
      summary: props.summary,
      keywords: props.keywords,
      importantDates: props.importantDates,
      actions: props.actions,
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

  get keywords(): string[] {
    return this.props.keywords;
  }

  get importantDates(): KnowledgeImportantDate[] {
    return this.props.importantDates;
  }

  get actions(): string[] {
    return this.props.actions;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
