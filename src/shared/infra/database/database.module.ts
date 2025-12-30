import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IDatabaseServiceToken } from './database.service.interface';
import { DrizzleService } from './drizzle/drizzle.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: IDatabaseServiceToken,
      useClass: DrizzleService,
    },
  ],
  exports: [IDatabaseServiceToken],
})
export class DatabaseModule {}
