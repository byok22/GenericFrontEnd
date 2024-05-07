import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { PrimengModule } from '../../modules/primeng.module';
import { TableData } from './interfaces/table-data';
import { TableColumn } from './interfaces/table-column';
import { TableFilter } from './interfaces/table-filter';
import { Table } from 'primeng/table';
import { timer } from 'rxjs';

@Component({
  selector: 'generic-table',
  standalone: true,
  imports: [
    CommonModule,
    PrimengModule
  ],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericTableComponent implements OnInit {
  @Input() data: TableData[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() filters: TableFilter[] = [];
  searchValue: string | undefined;
  loading: boolean = true;
  @ViewChild('table') table!: Table;


  constructor() {}

  ngOnInit() {
      // Puedes agregar lógica de inicialización aquí si es necesario
      this.loading = false;
  }

  clear(table: any, searchInput: any) {
    this.loading = false;
    timer(500).subscribe(() => {
      table.clear();
      searchInput.value = '';
      //this.sortField = "";
     // this.sortOrder = 0;
  
      // Obtener los datos filtrados
      //const filteredData = this.table.filteredValue as T[];
  
      // Emitir los datos filtrados
      //this.filteredData.emit(filteredData);
     // this.loading = true;
     // this.loading = false;
    });
  }
 

}