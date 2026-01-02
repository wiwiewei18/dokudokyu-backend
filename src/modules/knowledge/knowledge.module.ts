import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/infra/database/database.module';
import { IKnowledgeRepoToken } from './domain/repos/knowledge.repo.interface';
import { PostgresKnowledgeRepo } from './infra/repos/postgresKnowledge.repo';
import { StoreKnowledgeUseCase } from './app/useCases/storeKnowledge.useCase';
import { ContentProcessingCompletedSubscriber } from './subscriber/contentProcessingCompleted.subscriber';
import { GetKnowledgeUseCase } from './app/useCases/getKnowledge.useCase';
import { KnowledgeController } from './api/knowledge.controller';
import { IJwtServiceToken } from 'src/shared/infra/auth/jwt/jwt.service.interface';
import { JwtService } from 'src/shared/infra/auth/jwt/jwt.service';
import { EventBusModule } from 'src/shared/infra/eventBus/eventBus.module';

@Module({
  imports: [DatabaseModule, EventBusModule.forRoot('knowledge.exchange')],
  controllers: [KnowledgeController],
  providers: [
    {
      provide: IKnowledgeRepoToken,
      useClass: PostgresKnowledgeRepo,
    },
    {
      provide: IJwtServiceToken,
      useClass: JwtService,
    },

    StoreKnowledgeUseCase,
    GetKnowledgeUseCase,

    ContentProcessingCompletedSubscriber,
  ],
})
export class KnowledgeModule {}
