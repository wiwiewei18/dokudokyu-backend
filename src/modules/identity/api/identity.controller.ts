import { Body, Controller, Post } from '@nestjs/common';
import { SignInWithGoogleDto } from './dtos/signInWithGoogle.dto';
import { SignInWithGoogleUseCase } from '../app/useCases/signInWithGoogle.useCase';

@Controller('identity')
export class IdentityController {
  constructor(
    private readonly signInWithGoogleUseCase: SignInWithGoogleUseCase,
  ) {}

  @Post('sign-in/google')
  async signInWithGoogle(@Body() dto: SignInWithGoogleDto) {
    return this.signInWithGoogleUseCase.execute(dto.idToken);
  }
}
