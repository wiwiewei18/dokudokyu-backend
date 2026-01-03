import { Inject, Injectable } from '@nestjs/common';
import {
  type IDocumentRepo,
  IDocumentRepoToken,
} from '../../domain/document/repos/document.repo.interface';

export interface MarkContentProcessingStartedInput {
  documentId: string;
}

export interface MarkContentProcessingStartedOutput {
  documentId: string;
  status: string;
}

@Injectable()
export class MarkContentProcessingStartedUseCase {
  constructor(
    @Inject(IDocumentRepoToken) private readonly documentRepo: IDocumentRepo,
  ) {}

  async execute(
    input: MarkContentProcessingStartedInput,
  ): Promise<MarkContentProcessingStartedOutput> {
    const document = await this.documentRepo.findById(input.documentId);
    if (!document) {
      throw new Error('Document not found');
    }

    document.markContentProcessingStarted();

    await this.documentRepo.save(document);

    return {
      documentId: document.id,
      status: document.status.value,
    };
  }
}
