import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { IdentityModule } from './modules/identity/identity.module';

@Module({
  imports: [AppConfigModule, IdentityModule],
})
export class AppModule {}
