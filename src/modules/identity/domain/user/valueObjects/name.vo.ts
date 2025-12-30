import { ValueObject } from 'src/shared/domain/base.vo';

export class Name extends ValueObject<{ value: string }> {
  private constructor(name: string) {
    super({ value: name });
  }

  public static create(name: string): Name {
    if (!name || name.trim().length === 0)
      throw new Error('Name cannot be empty');
    return new Name(name);
  }

  get value(): string {
    return this.props.value;
  }
}
