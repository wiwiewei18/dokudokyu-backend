import { Inject, Injectable } from '@nestjs/common';
import {
  type IDocumentRepo,
  IDocumentRepoToken,
} from '../../domain/document/repos/document.repo.interface';

export interface GetDocumentListInput {
  userId: string;
}

interface DocumentItem {
  id: string;
  name: string;
  type: string;
  size: number;
  createdAt: string;
}

export interface GetDocumentListOutput {
  documents: DocumentItem[];
}

@Injectable()
export class GetDocumentListUseCase {
  constructor(
    @Inject(IDocumentRepoToken) private readonly documentRepo: IDocumentRepo,
  ) {}

  async execute(input: GetDocumentListInput): Promise<GetDocumentListOutput> {
    const documents = await this.documentRepo.findAllByUserId(input.userId);

    return {
      documents: documents?.map((document) => ({
        id: document.id,
        name: document.name.value,
        type: document.type.value,
        size: document.size.value,
        createdAt: document.createdAt.toISOString(),
      })),
    };
  }
}
