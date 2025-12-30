export const IDatabaseServiceToken = Symbol('IDatabaseService');

export interface IDatabaseService {
  getClient(): any;
}
