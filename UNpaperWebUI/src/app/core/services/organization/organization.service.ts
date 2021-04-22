import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationRequest } from 'src/app/shared/models/organization-request.model';
import { environment } from 'src/environments/environment';
import { RegistryApiRequestService } from '../request/registry-api-request.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  constructor(private readonly _requestService: RegistryApiRequestService) {}

  create(organization: OrganizationRequest): Observable<OrganizationRequest> {
    return this._requestService.post('/organizations', organization);
  }

  getById(id: string): Observable<OrganizationRequest> {
    return this._requestService.get(`/organizations/${id}`);
  }

  update(organization: OrganizationRequest): Observable<string> {
    return this._requestService.put('/organizations', organization);
  }

  delete(id: string): Observable<string> {
    return this._requestService.delete('/organizations', id);
  }
}
