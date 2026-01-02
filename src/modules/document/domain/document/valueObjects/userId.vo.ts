import { ValueObject } from 'src/shared/domain/base.vo';

export class UserId extends ValueObject<{ value: string }> {
  private constructor(userId: string) {
    super({ value: userId });
  }

  public static create(userId: string): UserId {
    if (!userId || userId.trim().length === 0)
      throw new Error('UserId cannot be empty');
    return new UserId(userId);
  }

  get value(): string {
    return this.props.value;
  }
}
