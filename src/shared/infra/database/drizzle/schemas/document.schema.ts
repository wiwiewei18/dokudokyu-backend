import { pgTable, uuid, varchar, bigint, timestamp } from 'drizzle-orm/pg-core';

export const documentTable = pgTable('documents', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 255 }).notNull(),
  size: bigint('size', { mode: 'number' }).notNull(),
  storagePath: varchar('storage_path', { length: 255 }).notNull(),
  status: varchar('status', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
