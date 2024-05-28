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
import { FormBuilder } from '@angular/forms';
import { FullCalendarComponent } from '../../shared/components/full-calendar/full-calendar.component';
import { GenericFullCalendarConcretBuilder } from '../../shared/components/full-calendar/builder/generic-fullcalendar-concret-builder';
import { FullCalendarInterface } from '../../shared/components/full-calendar/fullcalendar.interface';
import { IBody, IMasterPage } from './builder/master-page.interface';
import { MasterPageConcretBuilder } from './builder/master-page-concret-builder';
import { BodyComponent } from './components/body/body.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@Component({
  selector: 'app-master-page',
  standalone: true,
  imports: [
    CommonModule,RouterOutlet, GenericTableComponent,
     GenericMenuComponent, SelectDropdownComponent, PrimengModule, GenericFormComponent
    ,FullCalendarComponent, BodyComponent
    ,SidenavComponent
  ],
  templateUrl: './master-page.component.html',
  styleUrl: './master-page.component.css'
})
export class MasterPageComponent implements OnInit  {

  //Page Config

 
   //#region Master Page Declarations
   master: IMasterPage = {
    body: {
        collapsed:false,
        screenWidth:0
    }
  };
  //Body
  body: IBody = {
  collapsed:true,
  screenWidth:0
  };
  collapsed: boolean = false;
  screenWidth: number = 0;

  //#endregion

  
  constructor(
  ) {
  
    
  }

  ngOnInit(): void{
    this.ConfigMaster();
 
    

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
  
}