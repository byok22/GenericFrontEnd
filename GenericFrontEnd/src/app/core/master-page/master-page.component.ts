import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableData } from '../../shared/components/generic-table/interfaces/table-data';
import { TableColumn } from '../../shared/components/generic-table/interfaces/table-column';
import { TableFilter } from '../../shared/components/generic-table/interfaces/table-filter';
import { GenericTableComponent } from '../../shared/components/generic-table/generic-table.component';

@Component({
  selector: 'app-master-page',
  standalone: true,
  imports: [
    CommonModule,RouterOutlet, GenericTableComponent
  ],
  templateUrl: './master-page.component.html',
  styleUrl: './master-page.component.css'
})
export class MasterPageComponent {

  tableData: TableData[] = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Alice', age: 25 },
    { id: 3, name: 'Bob', age: 35 }
  ];

  tableColumns: TableColumn[] = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'age', header: 'Age' }
  ];

  tableFilters: TableFilter[] = [
    { field: 'name', type: 'text' },
    { field: 'age', type: 'numeric' }
  ];
  
 }
