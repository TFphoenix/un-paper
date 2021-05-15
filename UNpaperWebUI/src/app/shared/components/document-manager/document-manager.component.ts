import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentData } from '../../models/document-data.model';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/services/auth/auth.service';

// const URL = '/api/';
const URL = `${environment.services.functionsApi}/TestFunction`;

@Component({
  selector: 'unp-document-manager',
  templateUrl: './document-manager.component.html',
  styleUrls: ['./document-manager.component.scss']
})
export class DocumentManagerComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;

  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  objectName: string = 'Document';

  // Uploader
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean = false;
  response: string = 'No response yet';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: DocumentData,
    private dialogRef: MatDialogRef<DocumentManagerComponent, DocumentData>,
    private fb: FormBuilder,
    private readonly _authService: AuthService
  ) {
    // Ensure user authentication and get token
    _authService.getAuthenticationToken().then(result => {
      console.log(result);
      this.initializeUploader(`Bearer ${result.accessToken}`);
    });
  }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as DocumentData;
    }

    this.form = this.fb.group({
      name: [this.defaults.name, Validators.required]
      // description: [this.defaults.description, Validators.required],
      // foundationDate: [this.defaults.foundationDate, Validators.required],
      // identificationCode: [this.defaults.identificationCode, Validators.required]
    });
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  chooseFiles() {
    this.fileInput.nativeElement.click();
  }

  save() {
    if (this.isCreateMode()) {
      this.createEntity();
    } else if (this.isUpdateMode()) {
      this.updateEntity();
    }
  }

  createEntity() {
    const entity = this.form.value;

    this.dialogRef.close(entity);
  }

  updateEntity() {
    const entity = this.form.value;
    // entity.id = this.defaults.id;

    this.dialogRef.close(entity);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  private initializeUploader(authToken: string) {
    this.uploader = new FileUploader({
      url: URL,
      authToken: authToken,
      // authToken:
      //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJpc3MiOiJodHRwczovL3VucGFwZXIyMDIwLmIyY2xvZ2luLmNvbS83YmNiOGQwNS04ZjRlLTRkODUtODkyYi1jMjQyMWE1MmM1MDYvdjIuMC8iLCJleHAiOjE2MjEwOTA4NjEsIm5iZiI6MTYyMTA4NzI2MSwiYXVkIjoiYjgwMmFmOGItMjRmNy00ZDg2LTgzMDEtMWUzZDQxY2NlZjVjIiwib2lkIjoiOGYzMDE3OGEtOWM5Ni00ODY4LTg0N2MtN2I5MjBiOWM1YTdmIiwic3ViIjoiOGYzMDE3OGEtOWM5Ni00ODY4LTg0N2MtN2I5MjBiOWM1YTdmIiwiY2l0eSI6IkNvZGxlYSIsImNvdW50cnkiOiJSb21hbmlhIiwibmFtZSI6IlRlb2RvciBNaWhhZXNjdSIsImdpdmVuX25hbWUiOiJUZW9kb3IiLCJwb3N0YWxDb2RlIjoiNTA1MTAxIiwic3RhdGUiOiJCViIsInN0cmVldEFkZHJlc3MiOiJGcmV6aWVpIDM1IiwiZmFtaWx5X25hbWUiOiJUZXN0IiwiZW1haWxzIjpbIm1paGFlc2N1LnRlb2RvckB5YWhvby5jb20iXSwidGZwIjoiQjJDXzFfc2lnbnVwX3NpZ25pbiIsInNjcCI6ImZ1bmN0aW9ucy5yZWFkIGZ1bmN0aW9ucy53cml0ZSBkZW1vLnJlYWQgZGVtby53cml0ZSIsImF6cCI6Ijk1NTU4MmYyLTFmNDItNGJlMS1hNzNhLWMxNDQzZjI4MDM0YyIsInZlciI6IjEuMCIsImlhdCI6MTYyMTA4NzI2MX0.jCKYz6wbEGEyyV-vFSjrn2i-F4kq3BslMvfMHQloag_FhUMofnnUxW0wayvG6E42VHSS3B3eq5aE-PTkouuxN7dUrpvH_gA1CmLk79JrgsTXeyGV1XPu3l2LzRO0s4rViQpBI88pqO4HSzwhyN8nsAYwwp6J_WK1J0qzohdqhRfOy8sZosb3ljIY3jQHjxJtVEbtMpvHfY0e_q5dBmqfLI7iLTJAoLwVBGQVoQUm2AXmzoGa8bHS2461URUCAdlEYP1z4KzC12sk7rWCBUaB0yXRcxMPGIdzjxCZLqjsBSyycV-wpmyUkgb4IaYzgsf5_5luNjnlbsT1YMh5cRJdfQ',
      headers: [{ name: 'Ocp-Apim-Subscription-Key', value: environment.apimSubscriptionKey }],
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      allowedMimeType: [
        'application/json',
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/tiff'
      ],
      formatDataFunction: async item => {
        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });

    this.uploader.response.subscribe(res => (this.response = res));
  }
}
