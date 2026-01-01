import { Inject, Injectable } from '@nestjs/common';
import { Knowledge } from '../../domain/aggregates/knowledge.aggregate';
import { KnowledgeImportantDate } from '../../domain/valueObjects/knowledgeImportantDate.vo';
import {
  type IKnowledgeRepo,
  IKnowledgeRepoToken,
} from '../../domain/repos/knowledge.repo.interface';

export interface StoreKnowledgeUseCaseInput {
  documentId: string;
  extractedContent: string;
  summary: string;
  keywords: string[];
  importantDates: {
    date: string;
    type: 'deadline' | 'meeting' | 'payment' | 'event' | 'other';
    description: string;
  }[];
  actions: string[];
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
    const importantDates = input.importantDates.map((importantDate) =>
      KnowledgeImportantDate.create({
        date: importantDate.date,
        type: importantDate.type,
        description: importantDate.description,
      }),
    );

    const knowledge = Knowledge.create({
      documentId: input.documentId,
      extractedContent: input.extractedContent,
      summary: input.summary,
      keywords: input.keywords,
      importantDates: importantDates,
      actions: input.actions,
    });

    await this.knowledgeRepo.save(knowledge);

    return { knowledgeId: knowledge.id };
  }
}
