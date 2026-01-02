import { Inject, Injectable } from '@nestjs/common';
import {
  type IDocumentRepo,
  IDocumentRepoToken,
} from '../../domain/document/repos/document.repo.interface';
import {
  type IStorageService,
  IStorageServiceToken,
} from 'src/shared/infra/storage/storage.service.interface';
import {
  type IEventBus,
  IEventBusToken,
} from 'src/shared/infra/eventBus/eventBus.service.interface';

export interface CompleteDocumentUploadInput {
  documentId: string;
}

export interface CompleteDocumentUploadOutput {
  documentId: string;
  status: string;
}

@Injectable()
export class CompleteDocumentUploadUseCase {
  constructor(
    @Inject(IDocumentRepoToken) private readonly documentRepo: IDocumentRepo,
    @Inject(IStorageServiceToken)
    private readonly storageService: IStorageService,
    @Inject(IEventBusToken) private readonly eventBus: IEventBus,
  ) {}

  async execute(
    input: CompleteDocumentUploadInput,
  ): Promise<CompleteDocumentUploadOutput> {
    const document = await this.documentRepo.findById(input.documentId);
    if (!document) {
      throw new Error('Document not found');
    }

    const exists = await this.storageService.checkFileExists(
      document.storagePath,
    );
    if (!exists) {
      throw new Error('Uploaded file not found in storage');
    }

    document.completeUpload();

    await this.documentRepo.save(document);

    const events = document.pullDomainEvents();
    await this.eventBus.publishAll(events);

    return {
      documentId: document.id,
      status: document.status.value,
    };
  }
}
