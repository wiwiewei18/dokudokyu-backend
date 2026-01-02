import { Inject, Injectable } from '@nestjs/common';
import { IDocumentRepo } from '../../domain/document/repos/document.repo.interface';
import { IDatabaseServiceToken } from 'src/shared/infra/database/database.service.interface';
import { DrizzleService } from 'src/shared/infra/database/drizzle/drizzle.service';
import { Document } from '../../domain/document/aggregates/document.aggregate';
import { documentTable } from 'src/shared/infra/database/drizzle/schemas/document.schema';
import { eq } from 'drizzle-orm';
import { UserId } from '../../domain/document/valueObjects/userId.vo';
import { DocumentName } from '../../domain/document/valueObjects/documentName.vo';
import { DocumentType } from '../../domain/document/valueObjects/documentType.vo';
import { DocumentSize } from '../../domain/document/valueObjects/documentSize.vo';
import {
  DocumentStatus,
  DocumentStatusType,
} from '../../domain/document/valueObjects/documentStatus.vo';

@Injectable()
export class PostgresDocumentRepo implements IDocumentRepo {
  constructor(
    @Inject(IDatabaseServiceToken)
    private readonly databaseService: DrizzleService,
  ) {}

  private get db() {
    return this.databaseService.getClient();
  }

  async findById(id: string): Promise<Document | null> {
    const rows = await this.db
      .select()
      .from(documentTable)
      .where(eq(documentTable.id, id));
    if (!rows.length) return null;

    const row = rows[0];

    return Document.fromPersistence({
      id: row.id,
      userId: UserId.create(row.userId),
      name: DocumentName.create(row.name),
      type: DocumentType.create(row.type),
      size: DocumentSize.create(row.size),
      storagePath: row.storagePath,
      status: DocumentStatus.create(row.status as DocumentStatusType),
      createdAt: row.createdAt,
    });
  }

  async save(document: Document): Promise<void> {
    const exists = await this.findById(document.id);

    if (exists) {
      await this.db
        .update(documentTable)
        .set({
          userId: document.userId.value,
          name: document.name.value,
          type: document.type.value,
          size: document.size.value,
          storagePath: document.storagePath,
          status: document.status.value,
        })
        .where(eq(documentTable.id, document.id));
    } else {
      await this.db.insert(documentTable).values({
        id: document.id,
        userId: document.userId.value,
        name: document.name.value,
        type: document.type.value,
        size: document.size.value,
        storagePath: document.storagePath,
        status: document.status.value,
        createdAt: document.createdAt,
      });
    }
  }
}
