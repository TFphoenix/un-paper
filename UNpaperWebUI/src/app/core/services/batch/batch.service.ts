import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProject } from 'src/@fott/models/applicationState';
import { BatchRequest } from 'src/app/shared/models/batch-request.model';
import { FunctionsApiRequestService } from '../request/functions-api-request.service';
import { RegistryApiRequestService } from '../request/registry-api-request.service';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  constructor(
    private readonly _registryRequestService: RegistryApiRequestService,
    private readonly _functionsRequestService: FunctionsApiRequestService
  ) {}

  create(batch: BatchRequest): Observable<BatchRequest> {
    // return this._requestService.post('/batches', batch);
    return new Observable(oberver => {
      this._registryRequestService.post<BatchRequest>('/batches', batch).subscribe({
        next: createdBatch => {
          console.log(createdBatch); //TEST

          // Batch successfully created
          this._functionsRequestService
            .post(`/blobs/${createdBatch.organizationId}/${createdBatch.id}/metadata`, createdBatch)
            .subscribe({
              next: blobsResponse => {
                console.log(blobsResponse);
                oberver.next(createdBatch);
              },
              error: e => {
                // Error creating batch metadata
                const message = 'ERROR CREATING BATCH METADATA';
                oberver.error(message);
                console.error(message);
                console.error(e);
              }
            });
        },
        error: e => {
          // Error creating batch registry
          const message = 'ERROR CREATING BATCH REGISTRY';
          oberver.error(message);
          console.error(message);
          console.error(e);
        }
      });
    });
  }

  getById(id: string, includeOrganization: boolean = false): Observable<BatchRequest> {
    return this._registryRequestService.get(`/batches/${id}?organization=${includeOrganization}`);
  }

  update(batch: BatchRequest): Observable<string> {
    return this._registryRequestService.put('/batches', batch);
  }

  delete(id: string): Observable<string> {
    return this._registryRequestService.delete('/batches', id);
  }

  getFottMetadata(batch: BatchRequest): Observable<IProject> {
    return this._functionsRequestService.get(`/blobs/${batch.organizationId}/${batch.id}/metadata`);
  }

  getFottMetadataByIds(batchId: string, organizationId: string): Observable<IProject> {
    return this._functionsRequestService.get(`/blobs/${organizationId}/${batchId}/metadata`);
  }
}
