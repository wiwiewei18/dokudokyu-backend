import { Module } from '@nestjs/common';
import { IdentityController } from './api/identity.controller';
import { SignInWithGoogleUseCase } from './app/useCases/signInWithGoogle.useCase';
import { JwtService } from './infra/services/jwt.service';
import { GoogleAuthService } from './infra/services/googleAuth.service';
import { PostgresUserRepo } from './infra/repos/postgresUser.repo';
import { DatabaseModule } from 'src/shared/infra/database/database.module';
import { IJwtServiceToken } from './domain/user/services/jwt.service.interface';
import { IGoogleAuthServiceToken } from './domain/user/services/googleAuth.service.interface';
import { IUserRepoToken } from './domain/user/repos/user.repo.interface';

@Module({
  imports: [DatabaseModule],
  controllers: [IdentityController],
  providers: [
    {
      provide: IUserRepoToken,
      useClass: PostgresUserRepo,
    },
    {
      provide: IGoogleAuthServiceToken,
      useClass: GoogleAuthService,
    },
    {
      provide: IJwtServiceToken,
      useClass: JwtService,
    },
    SignInWithGoogleUseCase,
  ],
})
export class IdentityModule {}
