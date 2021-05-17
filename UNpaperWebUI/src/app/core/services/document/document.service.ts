import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentRequest } from 'src/app/shared/models/document-request.model';
import { FunctionsApiRequestService } from '../request/functions-api-request.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  constructor(private readonly _functionsRequestService: FunctionsApiRequestService) {}

  getDocuments(organizationId: string, batchId: string): Observable<DocumentRequest[]> {
    return this._functionsRequestService.get(`/blobs/${organizationId}/${batchId}`);
  }
}
