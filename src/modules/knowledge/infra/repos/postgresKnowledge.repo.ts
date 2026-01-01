import { Inject, Injectable } from '@nestjs/common';
import { IKnowledgeRepo } from '../../domain/repos/knowledge.repo.interface';
import { IDatabaseServiceToken } from 'src/shared/infra/database/database.service.interface';
import { DrizzleService } from 'src/shared/infra/database/drizzle/drizzle.service';
import { Knowledge } from '../../domain/aggregates/knowledge.aggregate';
import { knowledgeTable } from 'src/shared/infra/database/drizzle/schemas/knowledge.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class PostgresKnowledgeRepo implements IKnowledgeRepo {
  constructor(
    @Inject(IDatabaseServiceToken)
    private readonly databaseService: DrizzleService,
  ) {}

  private get db() {
    return this.databaseService.getClient();
  }

  async save(knowledge: Knowledge): Promise<void> {
    const exists = await this.db
      .select()
      .from(knowledgeTable)
      .where(eq(knowledgeTable.id, knowledge.id));

    if (exists.length) {
      await this.db
        .update(knowledgeTable)
        .set({
          documentId: knowledge.documentId,
          extractedContent: knowledge.extractedContent,
          summary: knowledge.summary,
          keywords: JSON.stringify(knowledge.keywords),
          importantDates: JSON.stringify(knowledge.importantDates),
          actions: JSON.stringify(knowledge.actions),
        })
        .where(eq(knowledgeTable.id, knowledge.id));
    } else {
      await this.db.insert(knowledgeTable).values({
        id: knowledge.id,
        documentId: knowledge.documentId,
        extractedContent: knowledge.extractedContent,
        summary: knowledge.summary,
        keywords: JSON.stringify(knowledge.keywords),
        importantDates: JSON.stringify(knowledge.importantDates),
        actions: JSON.stringify(knowledge.actions),
        createdAt: new Date(),
      });
    }
  }
}
