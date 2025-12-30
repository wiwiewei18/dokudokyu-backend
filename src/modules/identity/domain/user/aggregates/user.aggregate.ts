import { AggregateRoot } from 'src/shared/domain/base.aggregate';
import { Email } from '../valueObjects/email.vo';
import { Name } from '../valueObjects/name.vo';

interface UserProps {
  googleId: string;
  email: Email;
  name: Name;
  pictureUrl?: string;
  createdAt: Date;
}

export class User extends AggregateRoot<string> {
  private _id: string;
  private props: UserProps;

  private constructor(id: string, props: UserProps) {
    super();
    this._id = id;
    this.props = props;
  }

  public static create(props: {
    googleId: string;
    email: Email;
    name: Name;
    pictureUrl?: string;
  }): User {
    const id = crypto.randomUUID();
    const now = new Date();

    const user = new User(id, {
      googleId: props.googleId,
      email: props.email,
      name: props.name,
      pictureUrl: props.pictureUrl,
      createdAt: now,
    });

    return user;
  }

  get id(): string {
    return this._id;
  }

  get googleId(): string {
    return this.props.googleId;
  }

  get email(): Email {
    return this.props.email;
  }

  get name(): Name {
    return this.props.name;
  }

  get pictureUrl(): string | undefined {
    return this.props.pictureUrl;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  public updateProfile(name: Name, pictureUrl?: string): void {
    this.props.name = name;
    this.props.pictureUrl = pictureUrl;
  }
}
