import { Inject, Injectable } from '@nestjs/common';
import {
  type IKnowledgeRepo,
  IKnowledgeRepoToken,
} from '../../domain/repos/knowledge.repo.interface';

export interface GetKnowledgeInput {
  documentId: string;
}

interface Knowledge {
  summary: string;
}

export interface GetKnowledgeOutput {
  documentId: string;
  status: string;
  knowledge: Knowledge | null;
}

@Injectable()
export class GetKnowledgeUseCase {
  constructor(
    @Inject(IKnowledgeRepoToken) private readonly knowledgeRepo: IKnowledgeRepo,
  ) {}

  async execute(input: GetKnowledgeInput): Promise<GetKnowledgeOutput> {
    const knowledge = await this.knowledgeRepo.findByDocumentId(
      input.documentId,
    );
    if (!knowledge) {
      return {
        documentId: input.documentId,
        status: 'PROCESSING',
        knowledge: null,
      };
    }

    return {
      documentId: knowledge.documentId,
      status: 'COMPLETED',
      knowledge: { summary: knowledge.summary },
    };
  }
}
