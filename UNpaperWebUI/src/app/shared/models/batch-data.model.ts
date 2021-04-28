import { BatchRequest } from './batch-request.model';

export class BatchData extends BatchRequest {
  icon?: string;
  organizationName?: string;

  static getFromRequest(request: BatchRequest): BatchData {
    const data: BatchData = request;
    data.icon = 'icBatch';
    data.organizationName = request.organization ? request.organization.name : '';
    return data;
  }
}
