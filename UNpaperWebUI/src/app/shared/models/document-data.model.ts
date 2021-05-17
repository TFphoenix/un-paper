import { DocumentRequest } from './document-request.model';

export class DocumentData extends DocumentRequest {
  icon?: string;

  static getFromRequest(request: DocumentRequest): DocumentData {
    const data: DocumentData = request;
    data.icon = 'icDocument';
    return data;
  }
}
