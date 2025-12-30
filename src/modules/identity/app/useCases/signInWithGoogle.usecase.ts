import { User } from '../../domain/user/aggregates/user.aggregate';
import { Email } from '../../domain/user/valueObjects/email.vo';
import { Name } from '../../domain/user/valueObjects/name.vo';
import { IUserRepo } from '../../domain/user/repos/user.repo.interface';
import { IGoogleAuthService } from '../../domain/user/services/googleAuth.service.interface';
import { IJwtService } from '../../domain/user/services/jwt.service.interface';

export class SignInWithGoogleUseCase {
  constructor(
    private readonly userRepo: IUserRepo,
    private readonly googleAuthService: IGoogleAuthService,
    private readonly jwtService: IJwtService,
  ) {}

  async execute(idToken: string): Promise<{ user: User; accessToken: string }> {
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

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email.value,
    });

    return { user, accessToken };
  }
}
