import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user/user.service';
import { BatchRequest } from 'src/app/shared/models/batch-request.model';
import { OrganizationRequest } from 'src/app/shared/models/organization-request.model';

@Component({
  selector: 'unp-batch-create-update',
  templateUrl: './batch-create-update.component.html',
  styleUrls: ['./batch-create-update.component.scss']
})
export class BatchCreateUpdateComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  objectName: string = 'Batch';
  organizations: OrganizationRequest[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: BatchRequest,
    private dialogRef: MatDialogRef<BatchCreateUpdateComponent, BatchRequest>,
    private fb: FormBuilder,
    private readonly _userService: UserService
  ) {}

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as BatchRequest;
    }

    this.form = this.fb.group({
      name: [this.defaults.name, Validators.required],
      organizationId: [this.defaults.organizationId, Validators.required],
      description: [this.defaults.description, Validators.required]
    });

    this.populateUserOrganizations();
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
    entity.id = this.defaults.id;
    entity.organization = this.organizations[
      this.organizations.findIndex(o => o.id === entity.organizationId)
    ];

    this.dialogRef.close(entity);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  private populateUserOrganizations() {
    this._userService.getUserOrganizations().subscribe(organizations => {
      const data: OrganizationRequest[] = [];
      organizations.forEach(organization => {
        data.push(organization);
      });
      this.organizations = data;
    });
  }
}
