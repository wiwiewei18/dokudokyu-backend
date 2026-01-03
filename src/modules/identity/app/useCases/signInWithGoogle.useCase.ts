import { User } from '../../domain/user/aggregates/user.aggregate';
import { Email } from '../../domain/user/valueObjects/email.vo';
import { Name } from '../../domain/user/valueObjects/name.vo';
import {
  IUserRepoToken,
  type IUserRepo,
} from '../../domain/user/repos/user.repo.interface';
import {
  IGoogleAuthServiceToken,
  type IGoogleAuthService,
} from '../../domain/user/services/googleAuth.service.interface';
import {
  IJwtServiceToken,
  type IJwtService,
} from '../../../../shared/infra/auth/jwt/jwt.service.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SignInWithGoogleUseCase {
  constructor(
    @Inject(IUserRepoToken) private readonly userRepo: IUserRepo,
    @Inject(IGoogleAuthServiceToken)
    private readonly googleAuthService: IGoogleAuthService,
    @Inject(IJwtServiceToken) private readonly jwtService: IJwtService,
  ) {}

  async execute(idToken: string): Promise<{ accessToken: string }> {
    const googleUser = await this.googleAuthService.verifyToken(idToken);

    let user = await this.userRepo.findByGoogleId(googleUser.googleId);

    if (user) {
      user.updateProfile(Name.create(googleUser.name), googleUser.pictureUrl);
      await this.userRepo.save(user);
    } else {
      user = User.create({
        googleId: googleUser.googleId,
        email: Email.create(googleUser.email),
        name: Name.create(googleUser.name),
        pictureUrl: googleUser.pictureUrl,
      });
      await this.userRepo.save(user);
    }

    const accessToken = this.jwtService.sign({ userId: user.id });

    return { accessToken };
  }
}
