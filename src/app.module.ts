import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { IdentityModule } from './modules/identity/identity.module';
import { DocumentModule } from './modules/document/document.module';

@Module({
  imports: [AppConfigModule, IdentityModule, DocumentModule],
})
export class AppModule {}
