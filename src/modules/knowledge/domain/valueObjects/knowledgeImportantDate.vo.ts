import { ValueObject } from 'src/shared/domain/base.vo';

export type ImportantDateType =
  | 'deadline'
  | 'meeting'
  | 'payment'
  | 'event'
  | 'other';

export interface KnowledgeImportantDateProps {
  date: string;
  type: ImportantDateType;
  description: string;
}

export class KnowledgeImportantDate extends ValueObject<KnowledgeImportantDateProps> {
  private constructor(props: KnowledgeImportantDateProps) {
    super(props);
  }

  public static create(
    props: KnowledgeImportantDateProps,
  ): KnowledgeImportantDate {
    return new KnowledgeImportantDate(props);
  }

  get date(): string {
    return this.props.date;
  }

  get type(): ImportantDateType {
    return this.props.type;
  }

  get description(): string {
    return this.props.description;
  }
}
