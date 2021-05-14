import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentData } from '../../models/document-data.model';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

// const URL = '/api/';
const URL = `${environment.services.functionsApi}/TestFunction`;

@Component({
  selector: 'unp-document-manager',
  templateUrl: './document-manager.component.html',
  styleUrls: ['./document-manager.component.scss']
})
export class DocumentManagerComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  objectName: string = 'Document';

  // Uploader
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  response: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: DocumentData,
    private dialogRef: MatDialogRef<DocumentManagerComponent, DocumentData>,
    private fb: FormBuilder
  ) {
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
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

    this.hasBaseDropZoneOver = false;
    this.response = '';

    this.uploader.response.subscribe(res => (this.response = res));
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
}
