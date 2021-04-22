import { OrganizationRequest } from './organization-request.model';

export class OrganizationData extends OrganizationRequest {
  icon?: string;

  static getFromRequest(request: OrganizationRequest): OrganizationData {
    const data: OrganizationData = request;
    data.icon = 'icOrganization';
    return data;
  }
}
