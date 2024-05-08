import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableColumn } from '../../shared/components/generic-table/interfaces/table-column';
import { TableFilter } from '../../shared/components/generic-table/interfaces/table-filter';
import { GenericTableComponent } from '../../shared/components/generic-table/generic-table.component';
import { GenericTableConfig } from '../../shared/components/generic-table/interfaces/generic-table-config';
import { TestInterface } from '../../shared/interfaces/testInterface.interface';
import { BasicKpiComponent } from '../../shared/components/basic-kpi/basic-kpi.component';
import { BasicKpi } from '../../shared/interfaces/basic-kpi.interface';

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

  tableData: TestInterface[] = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Alice', age: 25 },
    { id: 3, name: 'Bob', age: 35 }
  ];
  kpis: BasicKpi[] = [
    { title :"Test",  total:"10"},
    { title :"Test2",  total:"102"}
  ]

  // Obtener los nombres de las columnas
   columnFields: string[] = Object.keys(this.tableData[0]);

   columnNames: string[] = this.columnFields.map(this.capitalizeFirstLetter);

   // Crear un arreglo de objetos TableColumn
   /* tableColumns: TableColumn[] = this.columnNames.map((this.columnFields, index:) => ({
      field: this.columnNames[index],
      header: this.columnFields
    }));*/

    tableColumns: TableColumn[] = this.columnFields.map((element, index)=>{
      
      const column: TableColumn = {
        field : this.columnFields[index],
        header: this.columnNames[index]
      }
      return column;
      
    }

    );
  
  tableConfig: GenericTableConfig<TestInterface> = {
    data : this.tableData,
    rowsPerPage : 10,
    rowsPerPageOptions :[10, 25, 500],
    pagination: false,
    columns: this.tableColumns,
    kpi: this.kpis
     
  } 
     
   capitalizeFirstLetter(word: string): string {
        if (!word) return word;
        return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }

 }
