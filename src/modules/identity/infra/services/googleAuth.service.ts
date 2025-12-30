import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { IGoogleAuthService } from '../../domain/user/services/googleAuth.service.interface';

@Injectable()
export class GoogleAuthService implements IGoogleAuthService {
  private client: OAuth2Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new OAuth2Client(
      this.configService.get<string>('google.clientId'),
    );
  }

  async verifyToken(idToken: string) {
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: this.configService.get<string>('google.clientId'),
    });
    const payload = ticket.getPayload();

    if (!payload) throw new Error('Invalid Google ID token');

    return {
      googleId: payload.sub,
      email: payload.email!,
      name: payload.name!,
      pictureUrl: payload.picture,
    };
  }
}
