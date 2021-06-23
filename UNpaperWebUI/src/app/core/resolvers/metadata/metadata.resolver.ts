import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, zip } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IProject } from 'src/@fott/models/applicationState';
import { BatchRequest } from 'src/app/shared/models/batch-request.model';
import { BatchService } from '../../services/batch/batch.service';

@Injectable({
  providedIn: 'root'
})
export class MetadataResolver implements Resolve<IProject> {
  constructor(private readonly _batchService: BatchService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProject> {
    console.log('Acquiring Batch metadata...');

    let selectedBatch = history.state.selectedBatch as BatchRequest;
    if (selectedBatch && selectedBatch.organizationId) {
      // Recieved necessary data from navigation state
      return this._batchService.getFottMetadataByIds(
        selectedBatch.id,
        selectedBatch.organizationId
      );
    } else {
      // Request needed
      return new Observable(observer => {
        this._batchService.getById(route.params['id'], true).subscribe(batch => {
          this._batchService.getFottMetadata(batch).subscribe(metadata => {
            observer.next(metadata);
            observer.complete();
          });
        });
      });
    }
  }
}
