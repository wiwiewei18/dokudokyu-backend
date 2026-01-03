import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';
import { IDatabaseService } from '../database.service.interface';

export type DrizzleDB = ReturnType<typeof drizzle>;

@Injectable()
export class DrizzleService implements IDatabaseService {
  private readonly db: DrizzleDB;

  constructor(private readonly configService: ConfigService) {
    const pool = new Pool({
      connectionString: this.configService.get<string>('postgres.url'),
    });

    this.db = drizzle(pool);
  }

  getClient(): DrizzleDB {
    return this.db;
  }
}
