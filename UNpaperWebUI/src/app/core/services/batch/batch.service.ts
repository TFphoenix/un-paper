import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BatchRequest } from 'src/app/shared/models/batch-request.model';
import { RegistryApiRequestService } from '../request/registry-api-request.service';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  constructor(private readonly _requestService: RegistryApiRequestService) {}

  create(batch: BatchRequest): Observable<BatchRequest> {
    return this._requestService.post('/batches', batch);
  }

  getById(id: string, includeOrganization: boolean = false): Observable<BatchRequest> {
    return this._requestService.get(`/batches/${id}?organization=${includeOrganization}`);
  }

  update(batch: BatchRequest): Observable<string> {
    return this._requestService.put('/batches', batch);
  }

  delete(id: string): Observable<string> {
    return this._requestService.delete('/batches', id);
  }
}
