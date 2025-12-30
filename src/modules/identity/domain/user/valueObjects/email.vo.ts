import { ValueObject } from 'src/shared/domain/base.vo';

export class Email extends ValueObject<{ value: string }> {
  private constructor(email: string) {
    super({ value: email });
  }

  public static create(email: string): Email {
    if (!Email.isValidEmail(email)) throw new Error('Invalid email address');
    return new Email(email);
  }

  get value(): string {
    return this.props.value;
  }

  private static isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}
