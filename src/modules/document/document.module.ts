import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/infra/database/database.module';
import { RequestDocumentUploadUseCase } from './app/useCases/requestDocumentUpload.useCase';
import { IDocumentRepoToken } from './domain/document/repos/document.repo.interface';
import { PostgresDocumentRepo } from './infra/repos/postgresDocument.repo';
import { IStorageServiceToken } from 'src/shared/infra/storage/storage.service.interface';
import { R2StorageService } from 'src/shared/infra/storage/cloudflare/r2Storage.service';
import { DocumentController } from './api/document.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [DocumentController],
  providers: [
    {
      provide: IDocumentRepoToken,
      useClass: PostgresDocumentRepo,
    },
    {
      provide: IStorageServiceToken,
      useClass: R2StorageService,
    },
    RequestDocumentUploadUseCase,
  ],
})
export class DocumentModule {}
