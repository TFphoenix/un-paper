import { Component, OnInit } from '@angular/core';
import { FunctionsApiRequestService } from 'src/app/core/services/request/functions-api-request.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { TableColumn } from 'src/app/shared/interfaces/table-column.interface';
import { OrganizationData } from 'src/app/shared/models/organization-data.model';
import { OrganizationRequest } from 'src/app/shared/models/organization-request.model';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {
  tableData: OrganizationData[] = [
    {
      icon: 'icPending',
      name: '...',
      description: '...',
      foundationDate: null,
      identificationCode: null
    }
  ];

  tableColumns: TableColumn<OrganizationData>[] = [
    { label: '', property: 'icon', type: 'badge', visible: true },
    { label: 'Name', property: 'name', type: 'text', visible: true },
    { label: 'Description', property: 'description', type: 'text', visible: true },
    { label: 'Foundation Date', property: 'foundationDate', type: 'text', visible: true },
    { label: 'Identification Code', property: 'identificationCode', type: 'text', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];

  constructor(private readonly _userService: UserService) {}

  ngOnInit(): void {
    this._userService.getUserOrganizations().subscribe(organizations => {
      const data: OrganizationData[] = [];

      organizations.forEach(organization => {
        data.push(organization);
        data[data.length - 1].icon = 'icOrganization';
      });

      this.tableData = data;
    });
  }
}
