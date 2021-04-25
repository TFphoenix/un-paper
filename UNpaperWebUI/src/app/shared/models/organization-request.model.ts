import { BatchRequest } from './batch-request.model';
import { EntityBaseRequest } from './entity-base-request.model';
import { OrganizationUserRequest } from './organization-user-request.model';

export class OrganizationRequest extends EntityBaseRequest {
  name: string;
  description: string;
  foundationDate: Date;
  identificationCode: string;

  organizationUsers?: OrganizationUserRequest[];
  batches?: BatchRequest[];
}
