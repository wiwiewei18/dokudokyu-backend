import { Inject, Injectable } from '@nestjs/common';
import {
  type IDocumentRepo,
  IDocumentRepoToken,
} from '../../domain/document/repos/document.repo.interface';
import {
  type IStorageService,
  IStorageServiceToken,
} from 'src/shared/infra/storage/storage.service.interface';
import { DocumentName } from '../../domain/document/valueObjects/documentName.vo';
import { DocumentType } from '../../domain/document/valueObjects/documentType.vo';
import { DocumentSize } from '../../domain/document/valueObjects/documentSize.vo';
import { Document } from '../../domain/document/aggregates/document.aggregate';
import { UserId } from '../../domain/document/valueObjects/userId.vo';

export interface RequestDocumentUploadInput {
  userId: string;
  name: string;
  type: string;
  size: number;
}

export interface RequestDocumentUploadOutput {
  documentId: string;
  presignedUploadUrl: string;
}

@Injectable()
export class RequestDocumentUploadUseCase {
  constructor(
    @Inject(IDocumentRepoToken) private readonly documentRepo: IDocumentRepo,
    @Inject(IStorageServiceToken)
    private readonly storageService: IStorageService,
  ) {}

  async execute(
    input: RequestDocumentUploadInput,
  ): Promise<RequestDocumentUploadOutput> {
    const userId = UserId.create(input.userId);
    const name = DocumentName.create(input.name);
    const type = DocumentType.create(input.type);
    const size = DocumentSize.create(input.size);

    const document = Document.create({
      userId,
      name,
      type,
      size,
    });

    await this.documentRepo.save(document);

    const presignedUploadUrl =
      await this.storageService.generatePresignedUploadUrl(
        document.storagePath,
        document.type.value,
      );

    return {
      documentId: document.id,
      presignedUploadUrl,
    };
  }
}
