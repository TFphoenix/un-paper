import { EntityBaseRequest } from './entity-base-request.model';
import { OrganizationRequest } from './organization-request.model';

export class BatchRequest extends EntityBaseRequest {
  name: string;
  description: string;
  organizationId: string;

  organization?: OrganizationRequest;
}
