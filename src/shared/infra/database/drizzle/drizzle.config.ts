import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  dialect: 'postgresql',
  schema: './src/shared/infra/database/drizzle/schemas/**/*.ts',
  out: './src/shared/infra/database/drizzle/migrations',
});
