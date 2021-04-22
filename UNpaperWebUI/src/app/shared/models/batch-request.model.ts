import { EntityBaseRequest } from './entity-base-request.model';

export class BatchRequest extends EntityBaseRequest {
  name: string;
  description: string;
  organizationId: string;
}
