import { AggregateRoot } from 'src/shared/domain/base.aggregate';
import { UserId } from '../valueObjects/userId.vo';
import { DocumentName } from '../valueObjects/documentName.vo';
import { DocumentType } from '../valueObjects/documentType.vo';
import { DocumentSize } from '../valueObjects/documentSize.vo';
import { DocumentStatus } from '../valueObjects/documentStatus.vo';
import { DocumentUploadedEvent } from '../events/documentUploaded.event';

interface DocumentProps {
  userId: UserId;
  name: DocumentName;
  type: DocumentType;
  size: DocumentSize;
  storagePath: string;
  status: DocumentStatus;
  createdAt: Date;
}

export class Document extends AggregateRoot<string> {
  private _id: string;
  private props: DocumentProps;

  private constructor(id: string, props: DocumentProps) {
    super();
    this._id = id;
    this.props = props;
  }

  public static create(props: {
    userId: UserId;
    name: DocumentName;
    type: DocumentType;
    size: DocumentSize;
  }): Document {
    const id = crypto.randomUUID();
    const now = new Date();
    const storagePath = `documents/${props.userId.value}/${id}-${props.name.value}`;

    const document = new Document(id, {
      userId: props.userId,
      name: props.name,
      type: props.type,
      size: props.size,
      storagePath: storagePath,
      status: DocumentStatus.pending(),
      createdAt: now,
    });

    return document;
  }

  static fromPersistence(props: {
    id: string;
    userId: UserId;
    name: DocumentName;
    type: DocumentType;
    size: DocumentSize;
    storagePath: string;
    status: DocumentStatus;
    createdAt: Date;
  }): Document {
    return new Document(props.id, {
      userId: props.userId,
      name: props.name,
      type: props.type,
      size: props.size,
      storagePath: props.storagePath,
      status: props.status,
      createdAt: props.createdAt,
    });
  }

  get id(): string {
    return this._id;
  }

  get userId(): UserId {
    return this.props.userId;
  }

  get name(): DocumentName {
    return this.props.name;
  }

  get type(): DocumentType {
    return this.props.type;
  }

  get size(): DocumentSize {
    return this.props.size;
  }

  get storagePath(): string {
    return this.props.storagePath;
  }

  get status(): DocumentStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  public completeUpload(): void {
    if (!this.props.status.isPending()) {
      throw new Error('Document is not in pending status');
    }
    this.props.status = DocumentStatus.completed();

    this.addDomainEvent(
      new DocumentUploadedEvent(
        this._id,
        this.props.storagePath,
        this.props.type.value,
      ),
    );
  }
}
