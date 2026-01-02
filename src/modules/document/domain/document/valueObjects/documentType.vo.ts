import { ValueObject } from 'src/shared/domain/base.vo';

const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

export class DocumentType extends ValueObject<{ value: string }> {
  private constructor(documentType: string) {
    super({ value: documentType });
  }

  public static create(documentType: string): DocumentType {
    if (!ALLOWED_TYPES.includes(documentType)) {
      throw new Error('Invalid document type');
    }
    return new DocumentType(documentType);
  }

  get value(): string {
    return this.props.value;
  }
}
