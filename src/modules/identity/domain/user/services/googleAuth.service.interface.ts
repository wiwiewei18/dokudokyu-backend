export interface IGoogleAuthService {
  verifyToken(idToken: string): Promise<{
    googleId: string;
    email: string;
    name: string;
    pictureUrl?: string;
  }>;
}
