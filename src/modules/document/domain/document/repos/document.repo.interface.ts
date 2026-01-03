import { Document } from '../aggregates/document.aggregate';

export const IDocumentRepoToken = Symbol('IDocumentRepo');

export interface IDocumentRepo {
  findById(id: string): Promise<Document | null>;
  findAllByUserId(userId: string): Promise<Document[]>;
  save(document: Document): Promise<void>;
}
