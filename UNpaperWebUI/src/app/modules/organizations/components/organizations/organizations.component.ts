import { Component, OnInit } from '@angular/core';
import { FunctionsApiRequestService } from 'src/app/core/services/request/functions-api-request.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { TableColumn } from 'src/app/shared/interfaces/table-column.interface';
import { TableData } from 'src/app/shared/models/table-data.model';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {
  tableData: TableData[] = [{ icon: 'icPending', name: '...', description: '...' }];

  tableColumns: TableColumn<TableData>[] = [
    { label: '', property: 'icon', type: 'badge', visible: true },
    { label: 'Name', property: 'name', type: 'text', visible: true },
    { label: 'Description', property: 'description', type: 'text', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];

  constructor(private readonly _userService: UserService) {}

  ngOnInit(): void {
    this._userService.getUserOrganizations().subscribe(organizations => {
      const data = [];

      organizations.forEach(organization => {
        data.push({
          icon: 'icOrganization',
          name: organization.name,
          description: organization.description
        });
      });

      this.tableData = data;
    });
  }
}
