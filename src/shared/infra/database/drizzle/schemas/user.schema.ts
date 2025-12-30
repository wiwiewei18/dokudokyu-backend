import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const userTable = pgTable('users', {
  id: uuid('id').primaryKey(),
  googleId: varchar('google_id', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  pictureUrl: text('picture_url').default(''),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
