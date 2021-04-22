import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrganizationRequest } from 'src/app/shared/models/organization-request.model';

@Component({
  selector: 'unp-organization-create-update',
  templateUrl: './organization-create-update.component.html',
  styleUrls: ['./organization-create-update.component.scss']
})
export class OrganizationCreateUpdateComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: OrganizationRequest,
    private dialogRef: MatDialogRef<OrganizationCreateUpdateComponent, OrganizationRequest>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as OrganizationRequest;
    }

    // this.form = this.fb.group({
    //   projectName: [this.defaults.projectName, Validators.required],
    //   projectKey: [this.defaults.projectKey, Validators.required],
    //   bambooProjectKey: [this.defaults.bambooProjectKey, Validators.required]
    // });
  }

  save() {
    if (this.isCreateMode()) {
      this.createProject();
    } else if (this.isUpdateMode()) {
      this.updateProject();
    }
  }

  createProject() {
    const project = this.form.value;

    this.dialogRef.close(project);
  }

  updateProject() {
    const project = this.form.value;
    project.id = this.defaults.id;

    this.dialogRef.close(project);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
