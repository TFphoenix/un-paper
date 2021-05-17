import { BatchRequest } from './batch-request.model';
import { DocumentData } from './document-data.model';

export class DocumentManagerData {
  activeBatch?: BatchRequest;
  documents?: DocumentData[];
}
