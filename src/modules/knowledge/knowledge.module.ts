import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/infra/database/database.module';
import { IKnowledgeRepoToken } from './domain/repos/knowledge.repo.interface';
import { PostgresKnowledgeRepo } from './infra/repos/postgresKnowledge.repo';
import { StoreKnowledgeUseCase } from './app/useCases/storeKnowledge.useCase';
import { ContentProcessingCompletedSubscriber } from './subscriber/contentProcessingCompleted.subscriber';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: IKnowledgeRepoToken,
      useClass: PostgresKnowledgeRepo,
    },

    StoreKnowledgeUseCase,

    ContentProcessingCompletedSubscriber,
  ],
})
export class KnowledgeModule {}
