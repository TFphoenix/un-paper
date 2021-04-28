import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrganizationService } from 'src/app/core/services/organization/organization.service';
import { FunctionsApiRequestService } from 'src/app/core/services/request/functions-api-request.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ConfirmationDialogDeleteComponent } from 'src/app/shared/components/confirmation-dialog-delete/confirmation-dialog-delete.component';
import { TableColumn } from 'src/app/shared/interfaces/table-column.interface';
import { OrganizationData } from 'src/app/shared/models/organization-data.model';
import { OrganizationRequest } from 'src/app/shared/models/organization-request.model';
import { OrganizationCreateUpdateComponent } from '../organization-create-update/organization-create-update.component';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {
  tableData: OrganizationData[] = [];

  tableColumns: TableColumn<OrganizationData>[] = [
    { label: '', property: 'icon', type: 'badge', visible: true },
    { label: 'Name', property: 'name', type: 'text', visible: true },
    { label: 'Description', property: 'description', type: 'text', visible: true },
    { label: 'Foundation Date', property: 'foundationDate', type: 'date', visible: true },
    { label: 'Identification Code', property: 'identificationCode', type: 'text', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];

  constructor(
    private readonly _organizationService: OrganizationService,
    private readonly _userService: UserService,
    private readonly _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    document.title = 'UNpaper - Organizations';

    this._userService.getUserOrganizations().subscribe(organizations => {
      const data: OrganizationData[] = [];
      organizations.forEach(organization => {
        data.push(OrganizationData.getFromRequest(organization));
      });
      this.tableData = data;
    });
  }

  addOrganization() {
    this._dialog
      .open(OrganizationCreateUpdateComponent)
      .afterClosed()
      .subscribe(organization => {
        if (organization) {
          this._organizationService.create(organization).subscribe({
            next: createdOrganization => {
              const data = [...this.tableData];
              data.push(OrganizationData.getFromRequest(createdOrganization));
              this.tableData = data;
            },
            error: errorMessage => {
              console.error(errorMessage);
            }
          });
        }
      });
  }

  editOrganization(organization: OrganizationData) {
    this._dialog
      .open(OrganizationCreateUpdateComponent, {
        data: organization
      })
      .afterClosed()
      .subscribe(updatedOrganization => {
        if (updatedOrganization) {
          this._organizationService.update(updatedOrganization).subscribe({
            next: result => {
              this.updateOrganization(updatedOrganization);
            },
            error: errorMessage => {
              console.error(errorMessage);
            }
          });
        }
      });
  }

  deleteOrganization(organization: OrganizationData) {
    const deleteDialogRef = this._dialog.open(ConfirmationDialogDeleteComponent, {
      data: { type: 'Organization', name: organization.name }
    });
    deleteDialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this._organizationService.delete(organization.id).subscribe({
          next: result => {
            this.removeOrganization(organization);
          },
          error: errorMessage => {
            console.error(errorMessage);
          }
        });
      }
    });
  }

  private updateOrganization(updatedOrganization: OrganizationRequest) {
    const data = [...this.tableData];
    const index = data.findIndex(o => o.id === updatedOrganization.id);
    data[index] = OrganizationData.getFromRequest(updatedOrganization);
    this.tableData = data;
  }

  private removeOrganization(removeOrganization: OrganizationRequest) {
    const data = [...this.tableData];
    data.splice(
      data.findIndex(o => o.id === removeOrganization.id),
      1
    );
    this.tableData = data;
  }
}
