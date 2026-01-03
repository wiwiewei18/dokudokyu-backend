import { Inject, Injectable } from '@nestjs/common';
import {
  type IDocumentRepo,
  IDocumentRepoToken,
} from '../../domain/document/repos/document.repo.interface';

export interface MarkContentProcessingCompletedInput {
  documentId: string;
}

export interface MarkContentProcessingCompletedOutput {
  documentId: string;
  status: string;
}

@Injectable()
export class MarkContentProcessingCompletedUseCase {
  constructor(
    @Inject(IDocumentRepoToken) private readonly documentRepo: IDocumentRepo,
  ) {}

  async execute(
    input: MarkContentProcessingCompletedInput,
  ): Promise<MarkContentProcessingCompletedOutput> {
    const document = await this.documentRepo.findById(input.documentId);
    if (!document) {
      throw new Error('Document not found');
    }

    document.markContentProcessingCompleted();

    await this.documentRepo.save(document);

    return {
      documentId: document.id,
      status: document.status.value,
    };
  }
}
