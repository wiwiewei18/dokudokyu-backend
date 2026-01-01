import { pgTable, uuid, text, timestamp, json } from 'drizzle-orm/pg-core';

export const knowledgeTable = pgTable('knowledges', {
  id: uuid('id').primaryKey(),
  documentId: uuid('document_id').notNull(),
  extractedContent: text('extracted_content').notNull(),
  summary: text('summary').notNull(),
  keywords: json('keywords').notNull(),
  importantDates: json('important_dates').notNull(),
  actions: json('actions').notNull(),
  createdAt: timestamp('created_at').notNull(),
});
