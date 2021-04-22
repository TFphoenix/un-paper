import { EntityBaseRequest } from './entity-base-request.model';

export class RoleRequest extends EntityBaseRequest {
  name: string;
  description: string;
}
