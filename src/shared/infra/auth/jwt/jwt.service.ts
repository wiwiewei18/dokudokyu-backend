import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';
import { IJwtService } from 'src/shared/infra/auth/jwt/jwt.service.interface';

@Injectable()
export class JwtService implements IJwtService {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor(private readonly configService: ConfigService) {
    this.secret = this.configService.get<string>('jwt.secret')!;
    this.expiresIn = this.configService.get<string>('jwt.expiresIn')!;
  }

  sign(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  verify(token: string): object | null {
    try {
      return jwt.verify(token, this.secret);
    } catch {
      return null;
    }
  }
}
