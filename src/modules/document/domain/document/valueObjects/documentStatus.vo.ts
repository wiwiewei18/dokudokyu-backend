import { ValueObject } from 'src/shared/domain/base.vo';

export type DocumentStatusType =
  | 'PENDING'
  | 'UPLOADED'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED';

export class DocumentStatus extends ValueObject<{
  value: DocumentStatusType;
}> {
  private constructor(status: DocumentStatusType) {
    super({ value: status });
  }

  public static create(documentStatus: DocumentStatusType): DocumentStatus {
    return new DocumentStatus(documentStatus);
  }

  public static pending(): DocumentStatus {
    return new DocumentStatus('PENDING');
  }

  public isPending(): boolean {
    return this.props.value === 'PENDING';
  }

  public static uploaded(): DocumentStatus {
    return new DocumentStatus('UPLOADED');
  }

  public isUploaded(): boolean {
    return this.props.value === 'UPLOADED';
  }

  public static processing(): DocumentStatus {
    return new DocumentStatus('PROCESSING');
  }

  public static completed(): DocumentStatus {
    return new DocumentStatus('COMPLETED');
  }

  public static failed(): DocumentStatus {
    return new DocumentStatus('FAILED');
  }

  get value(): string {
    return this.props.value;
  }
}
