import { User } from '../aggregates/user.aggregate';

export const IUserRepoToken = Symbol('IUserRepo');

export interface IUserRepo {
  findById(id: string): Promise<User | null>;
  findByGoogleId(googleId: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
