// Primary
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions
} from '@angular/material/form-field';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';

// Secondary
import { fadeInUp400ms } from 'src/app/shared/animations/fade-in-up.animation';
import { stagger40ms } from 'src/app/shared/animations/stagger.animation';
import { TableColumn } from '../../interfaces/table-column.interface';

// Icons
import icToggleArrowUp from '@iconify/icons-ic/round-keyboard-arrow-right';
import icToggleArrowDown from '@iconify/icons-ic/round-keyboard-arrow-down';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { TableAction } from '../../models/table-action.model';

@UntilDestroy()
@Component({
  selector: 'unp-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  animations: [fadeInUp400ms, stagger40ms],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class DataTableComponent implements OnInit {
  // input
  @Input() title: string = 'No Title';
  @Input() tableColumns: any[];
  @Input() hideComponent: boolean = false;
  @Input() showToggleIcon: boolean = false;
  @Input() pageSize: number = 10;
  @Input() searchDisplay: Boolean;
  @Input()
  get tableData() {
    return this.dataSource.data;
  }
  set tableData(tableData) {
    this.dataSource.data = tableData;
    this.noDataFound = this.initialized && tableData.length === 0;
  }
  @Input() additionalActions: TableAction[] = [];

  // output
  @Output() onSelect = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onBatches = new EventEmitter<any>();

  // controls
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  layoutCtrl = new FormControl('boxed');
  searchCtrl = new FormControl();
  noDataFound: boolean = false;

  // icons
  icToggle = icToggleArrowDown;

  // elements
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // other
  private initialized: boolean = false;

  constructor(private dialog: MatDialog) {}

  get visibleColumns() {
    if (this.tableColumns) {
      return this.tableColumns.filter(column => column.visible).map(column => column.property);
    }

    return null;
  }

  ngOnInit() {
    this.initialized = true;

    if (this.searchDisplay) {
      this.searchCtrl.valueChanges
        .pipe(untilDestroyed(this))
        .subscribe(value => this.onFilterChange(value));
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
    this.noDataFound = this.dataSource.filteredData.length === 0;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  toggleComponentView() {
    this.hideComponent = !this.hideComponent;

    if (this.hideComponent) {
      this.icToggle = icToggleArrowUp;
    } else {
      this.icToggle = icToggleArrowDown;
    }
  }

  onSelectClick(entity: any) {
    this.onSelect.emit(entity);
  }

  onEditClick(entity: any) {
    this.onEdit.emit(entity);
  }

  onDeleteClick(entity: any) {
    this.onDelete.emit(entity);
  }

  onBatchesClick(entity: any) {
    this.onBatches.emit(entity);
  }
}
