import { Component, OnInit } from '@angular/core';
import { FunctionsApiRequestService } from 'src/app/core/services/request/functions-api-request.service';
import { TableColumn } from 'src/app/shared/interfaces/table-column.interface';
import { TableData } from 'src/app/shared/models/table-data.model';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {
  tableData: TableData[] = [{ icon: 'icOrganization', name: 'Prop 2', description: 'Prop 3' }];

  tableColumns: TableColumn<TableData>[] = [
    { label: '', property: 'icon', type: 'badge', visible: true },
    { label: 'Name', property: 'name', type: 'text', visible: true },
    { label: 'Description', property: 'description', type: 'text', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];

  constructor() {}

  ngOnInit(): void {}
}
