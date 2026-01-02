import { ValueObject } from 'src/shared/domain/base.vo';

export class DocumentName extends ValueObject<{ value: string }> {
  private constructor(documentName: string) {
    super({ value: documentName });
  }

  public static create(documentName: string): DocumentName {
    if (!documentName || documentName.trim().length === 0)
      throw new Error('DocumentName cannot be empty');
    return new DocumentName(documentName);
  }

  get value(): string {
    return this.props.value;
  }
}
