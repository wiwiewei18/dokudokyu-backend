import { Knowledge } from '../aggregates/knowledge.aggregate';

export const IKnowledgeRepoToken = Symbol('IKnowledgeRepo');

export interface IKnowledgeRepo {
  save(knowledge: Knowledge): Promise<void>;
}
