import { ValueObject } from 'src/shared/domain/base.vo';

const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024; // 10 MB

export class DocumentSize extends ValueObject<{ value: number }> {
  private constructor(documentSize: number) {
    super({ value: documentSize });
  }

  public static create(documentSize: number): DocumentSize {
    if (documentSize <= 0)
      throw new Error('Document size must be greater than 0');
    if (documentSize > MAX_DOCUMENT_SIZE)
      throw new Error(
        `Document size must not exceed ${MAX_DOCUMENT_SIZE} bytes`,
      );
    return new DocumentSize(documentSize);
  }

  get value(): number {
    return this.props.value;
  }
}
