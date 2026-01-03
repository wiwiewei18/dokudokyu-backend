import { Knowledge } from '../aggregates/knowledge.aggregate';

export const IKnowledgeRepoToken = Symbol('IKnowledgeRepo');

export interface IKnowledgeRepo {
  findByDocumentId(documentId: string): Promise<Knowledge | null>;
  save(knowledge: Knowledge): Promise<void>;
}
