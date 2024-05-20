import { CommonModule } from '@angular/common';
import {  Component, OnInit, signal  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableColumn } from '../../shared/components/generic-table/interfaces/table-column';
import { GenericTableComponent } from '../../shared/components/generic-table/generic-table.component';
import { GenericTableConfig } from '../../shared/components/generic-table/interfaces/generic-table-config';
import { TestInterface } from '../../shared/interfaces/testInterface.interface';
import { BasicKpi } from '../../shared/interfaces/basic-kpi.interface';
import { TableBuilderFactoryService } from '../../shared/components/generic-table/service/table-builder-factory-service.service';
import { GenericMenuInterface } from '../../shared/components/generic-menu/interfaces/generic-menu-item.interface';
import { GenericMenuConcreteBuilder } from '../../shared/components/generic-menu/builder/generic-menu-concret-builder';
import { GenericMenuComponent } from '../../shared/components/generic-menu/generic-menu.component';
import { SelectOption } from '../../shared/interfaces/select-option.interface';
import { SelectDropdownComponent } from '../../shared/components/select-dropdown/select-dropdown.component';
import { GenericFormInterface } from '../../shared/components/generic-form/generic-form.interface';
import { PrimengModule } from '../../shared/modules/primeng.module';
import { GenericFormComponent } from '../../shared/components/generic-form/generic-form.component';
import { GenericFormConcretBuilder } from '../../shared/components/generic-form/builder/generic-form-concret-builder';
import { text } from 'stream/consumers';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-master-page',
  standalone: true,
  imports: [
    CommonModule,RouterOutlet, GenericTableComponent, GenericMenuComponent, SelectDropdownComponent, PrimengModule, GenericFormComponent
  ],
  templateUrl: './master-page.component.html',
  styleUrl: './master-page.component.css'
})
export class MasterPageComponent implements OnInit  {


  /**
   *
   */
  //Page Config
  //For Knwon if the form is Edit o ADD  
  public EditAdd = signal<string>('');
  public displayMaximizable: boolean = false;  

  public dataTest =signal<TestInterface>
  (
    {

    id: 1, name: 'John', age: 30
   }   
  ) ;
  //Reviso si se hace un submit
  public submit = signal(false); 

  //Table
  tableConfig!: GenericTableConfig<TestInterface>;
   
  //Menu
  menuItems: GenericMenuInterface[] = [];  
  //Formulario
  genericForm:GenericFormInterface<TestInterface>={
    tittle: '',
    fields: [],
    customFromGroup: undefined,
    editAdd: '',
    data:this.dataTest()
  };
   
 // columnFields?: string[] ;
  constructor(private serviceTable: TableBuilderFactoryService,
    private fb: FormBuilder
  ) {
  
    
  }

  ngOnInit(): void{
    this.ConfigTable();
    this.ConfigMenu();
   // this.ConfigForm();
    

  }
  //#region Config Form
  ConfigForm() {
  
    const builder = new GenericFormConcretBuilder<TestInterface>();
    builder.Reset();
    builder.SetEditAdd(this.EditAdd.toString());
    
    builder.SetField({
      field:'id',
      label:'id',
      order:1,
      required:true,
      type:'text',
      validationRequired:true,
      enable:true,
      show:true,
      value:this.dataTest().id

    });
    builder.SetField({
      field:'age',
      label:'age',
      order:3,
      required:true,
      type:'text',
      validationRequired:true,
      enable:true,
      show:true,
      value:this.dataTest().age

    });
    builder.SetField({
      field:'name',
      label:'name',
      order:2,
      required:true,
      type:'text',
      validationRequired:true,
      enable:true,
      show:true,
      value:this.dataTest().name

    });
    builder.SetFormGroup(
      this.fb.group({
        id:[0],
        age:[0],
        name:['']
        
      })
    );
    builder.SetSubmitFunction(
      ()=>{
        console.log('Se hizo Submit');
        this.displayMaximizable = false;
      }
    );
    builder.SetTitle('Test Prueba');
    this.genericForm = builder.Generate();
  }
  //#endregion

  //#region Config Table
  ConfigTable():void{
    const builder = this.serviceTable.createBuilder<TestInterface>();
    builder.Reset();
    builder.SetTitle("Custom Table");
    builder.SetDataKey("customId");
    builder.SetData(this.GetData());
    builder.SetKpis(this.GetKpis());
    builder.SetPagination(true);
    builder.SetRowsPerPage(10);
    builder.SetRowsPerPageOptions([5, 10, 20]);
    builder.SetColumns(this.getColumns());
    builder.SetGlobalFilterFields(["name", "age"]);
    //builder.SetGroupBy("category");
   // builder.Generate();

    this.tableConfig = builder.Generate();

  }
  getModal(item: TestInterface = {} as TestInterface) {
    
    this.submit.set(false) ;

   
    //Put Header in Modal
    if(item.id==0|| item.id == undefined){
      this.EditAdd.set('Add')
    }else{
      this.EditAdd.set('Edit')
    }

    //Show Modal
    this.displayMaximizable = true;
    //Use Selected Object
    if(this.EditAdd()=='Edit')
    {
      this.dataTest.set(item);
    }else{

      const dataTestTemp: TestInterface ={
        id: 1, name: 'John', age: 30  
      }
     

      this.dataTest.set(dataTestTemp);
    }
    this.ConfigForm();
  }

  GetData(): TestInterface[] {
    return [
      { id: 1, name: 'John', age: 30 },
      { id: 2, name: 'Alice', age: 25 },
      { id: 3, name: 'Bob', age: 35 }
    ];
  }
  GetKpis(): BasicKpi[] {
    return   [
      { title :"Test",  total:"10"},
      { title :"Test2",  total:"102"}
    ];
  }
  getColumns(): TableColumn[] {
    const columnFields = Object.keys(this.GetData()[0]);
    const columnNames: string[] = columnFields.map(this.capitalizeFirstLetter);

    return columnFields.map((element, index)=>{           
      return {
        field : columnFields[index],
        header: columnNames[index]
      };    
  });
}
capitalizeFirstLetter(word: string): string {
  if (!word) return word;
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
}
  //#endregion
  //#region  ConfigMenu
  ConfigMenu(): void {
    const builder = new GenericMenuConcreteBuilder();
    builder.Reset();
    const building : SelectOption[] = [{ id: '1', text: 'Building 1' }, { id: '2', text: 'Building 2' }];
    const selectedOption: SelectOption ={ id: '2', text: 'Building 2' };

    builder.SetDropDown({
      item: { 
        selectedOption: selectedOption,
        options: building, onChange: (event:any) => { /* handle change */ } 
      },
      labelText: 'Buildings',
      order: 1,
      type: 'dropdown'
    });

    builder.SetDropDown({
      item: { 
       selectedOption: { id: '2', text: 'Customer 2' },
        options: [{ id: '1', text: 'Customer 1' }, { id: '2', text: 'Customer 2' }], onChange: (event:any) => { /* handle change */ } 
      },
      labelText: 'Customers',
      order: 3,
      type: 'dropdown'
    });

    builder.SetDropDown({
      item: { 
        selectedOption: { id: '1', text: 'Department 1' },
        options: [{ id: '1', text: 'Department 1' }, { id: '2', text: 'Department 2' }], onChange: (event:any) => { /* handle change */ }
       },
      labelText: 'Departments',
      order: 2,
      type: 'dropdown'
    });

    builder.SetCalendar({
      item: { model: new Date(), onSelect: (event:any) => { /* handle select */ } },
      labelText: 'Start Date',
      order: 4,
      type: 'calendar'
    });

    builder.SetButton({
      item: { onClick: () => { /* handle click */ } },
      labelText: 'Get Production',
      order: 5,
      type: 'button'
    });

    this.menuItems = builder.Generate();
  }
  //#endregion
  

 

  


 
 

  

   

  
   

 }
