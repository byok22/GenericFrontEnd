import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BodyComponent } from '../../core/master-page/components/body/body.component';
import { GenericFormComponent } from '../../shared/components/generic-form/generic-form.component';
import { GenericMenuComponent } from '../../shared/components/generic-menu/generic-menu.component';
import { GenericTableComponent } from '../../shared/components/generic-table/generic-table.component';
import { SelectDropdownComponent } from '../../shared/components/select-dropdown/select-dropdown.component';
import { PrimengModule } from '../../shared/modules/primeng.module';
import { FullCalendarComponent } from '../../shared/components/full-calendar/full-calendar.component';
import { FormBuilder } from '@angular/forms';
import { MasterPageConcretBuilder } from '../../core/master-page/builder/master-page-concret-builder';
import { IMasterPage, IBody } from '../../core/master-page/builder/master-page.interface';
import { GenericFullCalendarConcretBuilder } from '../../shared/components/full-calendar/builder/generic-fullcalendar-concret-builder';
import { FullCalendarInterface } from '../../shared/components/full-calendar/fullcalendar.interface';
import { GenericFormConcretBuilder } from '../../shared/components/generic-form/builder/generic-form-concret-builder';
import { GenericFormInterface } from '../../shared/components/generic-form/generic-form.interface';
import { GenericMenuConcreteBuilder } from '../../shared/components/generic-menu/builder/generic-menu-concret-builder';
import { GenericMenuInterface } from '../../shared/components/generic-menu/interfaces/generic-menu-item.interface';
import { GenericTableConfig } from '../../shared/components/generic-table/interfaces/generic-table-config';
import { TableColumn } from '../../shared/components/generic-table/interfaces/table-column';
import { TableBuilderFactoryService } from '../../shared/components/generic-table/service/table-builder-factory-service.service';
import { BasicKpi } from '../../shared/interfaces/basic-kpi.interface';
import { SelectOption } from '../../shared/interfaces/select-option.interface';
import { TestInterface } from '../../shared/interfaces/testInterface.interface';
import { PruebaService } from '../service/prueba.service';
import { firstValueFrom } from 'rxjs';
import { GenericTitleComponent } from '../../shared/components/generic-title/generic-title.component';

@Component({
  selector: 'app-pagina-pruebas',
  standalone: true,
  imports: [
    CommonModule,RouterOutlet, GenericTableComponent, GenericMenuComponent, SelectDropdownComponent, PrimengModule, GenericFormComponent
    , BodyComponent, FullCalendarComponent, GenericTitleComponent
  ],
  providers:[
    DatePipe
  ],
  templateUrl: './pagina-pruebas.component.html',
  styleUrl: './pagina-pruebas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginaPruebasComponent implements OnInit  {


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

   //#region Master Page Declarations
   master: IMasterPage = {
    body: {
        collapsed:false,
        screenWidth:0
    }
  };
  //Body
  body: IBody = {
  collapsed:false,
  screenWidth:0
  };
  collapsed: boolean = false;
  screenWidth: number = 0;

  //#endregion

  //Table
  tableConfig!: GenericTableConfig<TestInterface>;
  dataTable:TestInterface[]=[];
  hideTable = signal(true);
  builderTable = this.serviceTable.createBuilder<TestInterface>();
  public newTable = signal(true);
   
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

  //FullCalendar
  genericFullCalendar: FullCalendarInterface = {
    events:[]
  };
   
 // columnFields?: string[] ;
  constructor(
    private serviceTable: TableBuilderFactoryService,
    private fb: FormBuilder,
    private testService: PruebaService,
    private datePipe: DatePipe
  ) {
  
    
  }

  ngOnInit(): void{
    this.ConfigMaster();
    this.ConfigTable();
    this.ConfigMenu();
    this.configCalendar();
   // this.ConfigForm();
    

  }
  ConfigMaster(){
    this.ConfigBody();
  }
  ConfigBody(){
    this.body.collapsed = this.collapsed;
    this.body.screenWidth = this.screenWidth;
    const builder = new MasterPageConcretBuilder();
    builder.setBody(this.body);
    this.master = builder.Generate();
    

  }
  
  //#region Config Form
  ConfigForm() {
  
    const builder = new GenericFormConcretBuilder<TestInterface>();
    builder.Reset();
    builder.SetEditAdd(this.EditAdd.toString());
    
    builder.SetField({
      field:'id',
      label:'id',
      order:2,
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
      order:1,
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
      order:3,
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
  async ConfigTable():Promise<void>{
    const data = await this.GetData()
   
    this.builderTable.Reset();
    this.builderTable.SetTitle("Custom Table");
    this.builderTable.SetDataKey("customId");
    this.builderTable.SetData(data);
    this.builderTable.SetKpis(this.GetKpis());
    this.builderTable.SetPagination(true);
    this.builderTable.SetRowsPerPage(10);
    this.builderTable.SetRowsPerPageOptions([5, 10, 20]);
    this.builderTable.SetColumns(await this.getColumns());
    this.builderTable.SetGlobalFilterFields(["name", "age"]);
    //this.builderTable.SetGroupBy("category");
   // this.builderTable.Generate();

    this.tableConfig = this.builderTable.Generate();

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

  async GetData(): Promise<TestInterface[]> {


    try {
      const dataTestRequest = await firstValueFrom(this.testService.getPruebas());
     
      return dataTestRequest;
    } catch (error) {
      console.error('Error fetching data', error);
      throw error;
    }     
   
  }
  GetKpis(): BasicKpi[] {
    return   [
      { title :"Test",  total:"10"},
      { title :"Test2",  total:"102"}
    ];
  }
  async getColumns(): Promise<TableColumn[]> {
    const data = this.dataTable;
    const columnFields = Object.keys(data[0]);
    const columnNames = columnFields.map(this.capitalizeFirstLetter);

    let columns: TableColumn[] = columnFields.map((field, index) => ({
        field,
        header: columnNames[index]
    }));

    const fieldsToHide = ["id", "active", "start", "tentativeEnd", "LastUpdatedBy", "LastUpdatedMessage", "end"];
    
    columns = columns.map(column => ({
        ...column,
        showHeader: !fieldsToHide.includes(column.field)
    }));

    return columns;
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
        options: building, onChange: (event:any) => { 
          this.hideTable.set(true);
          /* handle change */ } 
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
  //#region  FullCalendar
  configCalendar(): void{
    const builder = new GenericFullCalendarConcretBuilder();
    builder.Reset();
    builder.SetEvent(
      {
        title:'Evento 3',
        start: new Date(new Date().getTime()+86400000 * 2 ),
        end:  new Date(new Date().getTime()+86400000 * 3 ),
        description: "Evento 3"
      },
    );
    this.genericFullCalendar = builder.Generate();
  }
  //#endregion

 

  


 
 

  

   

  
   

 }
