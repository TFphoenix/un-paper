import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationRequest } from 'src/app/shared/models/organization-request.model';
import { FunctionsApiRequestService } from '../request/functions-api-request.service';
import { RegistryApiRequestService } from '../request/registry-api-request.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  constructor(
    private readonly _registryRequestService: RegistryApiRequestService,
    private readonly _functionsRequestService: FunctionsApiRequestService
  ) {}

  create(organization: OrganizationRequest): Observable<OrganizationRequest> {
    return new Observable(oberver => {
      this._registryRequestService
        .post<OrganizationRequest>('/organizations', organization)
        .subscribe({
          next: createdOrganization => {
            console.log(createdOrganization); //TEST

            // Organization successfully created
            this._functionsRequestService
              .post('/blobs/organizations', createdOrganization)
              .subscribe({
                next: blobsResponse => {
                  console.log(blobsResponse);
                  oberver.next(createdOrganization);
                },
                error: e => {
                  // Error creating organization container
                  const message = 'ERROR CREATING ORGANIZATION CONTAINER';
                  oberver.error(message);
                  console.error(message);
                  console.error(e);
                }
              });
          },
          error: e => {
            // Error creating organization registry
            const message = 'ERROR CREATING ORGANIZATION REGISTRY';
            oberver.error(message);
            console.error(message);
            console.error(e);
          }
        });

      // When the consumer unsubscribes, clean up data ready for next subscription.
      // return {
      //   unsubscribe() {}
      // };
    });
  }

  getById(id: string): Observable<OrganizationRequest> {
    return this._registryRequestService.get(`/organizations/${id}`);
  }

  update(organization: OrganizationRequest): Observable<string> {
    return this._registryRequestService.put('/organizations', organization);
  }

  delete(id: string): Observable<string> {
    return this._registryRequestService.delete('/organizations', id);
  }
}
