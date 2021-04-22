import { Component, OnInit } from '@angular/core';
import { TableColumn } from 'src/app/shared/interfaces/table-column.interface';
import { TableData } from 'src/app/shared/models/table-data.model';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.scss']
})
export class BatchesComponent implements OnInit {
  tableData: TableData[] = [{ icon: 'icBatch', name: 'Prop 2', description: 'Prop 3' }];

  tableColumns: TableColumn<TableData>[] = [
    { label: '', property: 'icon', type: 'badge', visible: true },
    { label: 'Name', property: 'name', type: 'text', visible: true },
    { label: 'Description', property: 'description', type: 'text', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];

  constructor() {}

  ngOnInit(): void {}
}
