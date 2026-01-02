import { Inject, Injectable } from '@nestjs/common';
import { Knowledge } from '../../domain/aggregates/knowledge.aggregate';
import {
  type IKnowledgeRepo,
  IKnowledgeRepoToken,
} from '../../domain/repos/knowledge.repo.interface';

export interface StoreKnowledgeUseCaseInput {
  documentId: string;
  extractedContent: string;
  summary: string;
}

export interface StoreKnowledgeUseCaseOutput {
  knowledgeId: string;
}

@Injectable()
export class StoreKnowledgeUseCase {
  constructor(
    @Inject(IKnowledgeRepoToken) private readonly knowledgeRepo: IKnowledgeRepo,
  ) {}

  async execute(
    input: StoreKnowledgeUseCaseInput,
  ): Promise<StoreKnowledgeUseCaseOutput> {
    const knowledge = Knowledge.create({
      documentId: input.documentId,
      extractedContent: input.extractedContent,
      summary: input.summary,
    });

    await this.knowledgeRepo.save(knowledge);

    return { knowledgeId: knowledge.id };
  }
}
