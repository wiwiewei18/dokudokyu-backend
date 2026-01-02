import { Document } from '../aggregates/document.aggregate';

export const IDocumentRepoToken = Symbol('IDocumentRepo');

export interface IDocumentRepo {
  findById(id: string): Promise<Document | null>;
  save(document: Document): Promise<void>;
}
