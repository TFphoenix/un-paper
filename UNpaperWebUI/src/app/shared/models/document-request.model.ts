export class DocumentRequest {
  name: string;
  length: number;
  contentType: string;

  createdOn?: Date;
  lastModifiedOn?: Date;
  blobPath?: string;
}
