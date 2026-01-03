import { Inject, Injectable } from '@nestjs/common';
import {
  type IDocumentRepo,
  IDocumentRepoToken,
} from '../../domain/document/repos/document.repo.interface';
import {
  type IStorageService,
  IStorageServiceToken,
} from 'src/shared/infra/storage/storage.service.interface';

export interface GetDocumentPreviewInput {
  documentId: string;
}

export interface GetDocumentPreviewOutput {
  documentId: string;
  presignedReadUrl: string;
  type: string;
}

@Injectable()
export class GetDocumentPreviewUseCase {
  constructor(
    @Inject(IDocumentRepoToken) private readonly documentRepo: IDocumentRepo,
    @Inject(IStorageServiceToken)
    private readonly storageService: IStorageService,
  ) {}

  async execute(
    input: GetDocumentPreviewInput,
  ): Promise<GetDocumentPreviewOutput> {
    const document = await this.documentRepo.findById(input.documentId);
    if (!document) {
      throw new Error('Document not found');
    }

    const presignedReadUrl = await this.storageService.generatePresignedReadUrl(
      document.storagePath,
    );

    return {
      documentId: document.id,
      presignedReadUrl,
      type: document.type.value,
    };
  }
}
