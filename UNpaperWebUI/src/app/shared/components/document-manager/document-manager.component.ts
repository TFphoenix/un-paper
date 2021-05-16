import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentData } from '../../models/document-data.model';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/services/auth/auth.service';

const URL = `${environment.services.functionsApi}/blobs/be3ba1f5-474d-4298-8aa6-8cba865fd216/bth`;

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
      headers: [{ name: 'Ocp-Apim-Subscription-Key', value: environment.apimSubscriptionKey }],
      // disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      // formatDataFunctionIsAsync: true,
      allowedMimeType: [
        'application/json',
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/tiff'
      ]
      // formatDataFunction: async item => {
      //   console.log(item);
      //   return new Promise((resolve, reject) => {
      //     resolve({
      //       name: item._file.name,
      //       length: item._file.size,
      //       contentType: item._file.type,
      //       date: new Date()
      //     });
      //   });
      // }
    });

    this.uploader.response.subscribe(res => (this.response = res));
  }
}
