export const IStorageServiceToken = Symbol('IStorageService');

export interface IStorageService {
  generatePresignedUploadUrl(
    storagePath: string,
    contentType: string,
  ): Promise<string>;
  checkFileExists(storagePath: string): Promise<boolean>;
}
