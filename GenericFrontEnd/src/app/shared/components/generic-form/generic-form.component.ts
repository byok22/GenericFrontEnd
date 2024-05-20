import { AfterViewInit, Component, Input, OnInit, SimpleChanges, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicSelectComponent } from './forms/dynamic-select/dynamic-select.component';
import { DynamicInputComponent } from './forms/dynamic-input/dynamic-input.component';
import { DynamicCheckBoxComponent } from './forms/dynamic-check-box/dynamic-check-box.component';
import { FormControl, FormGroup } from '@angular/forms';
import { GenericFormInterface } from './generic-form.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'generic-form',
  standalone: true,
  imports: [
    CommonModule,
    DynamicSelectComponent,
    DynamicInputComponent,
    DynamicCheckBoxComponent
  ],
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss']
})
export class GenericFormComponent<T> implements  AfterViewInit, OnInit {

    
 
    @Input() genericForm:GenericFormInterface<T>={
     tittle: '',
     fields: [],
     customFromGroup: undefined,
     editAdd: ''
   };
 

  //Types supported
  supportedDynamicComponents = [
    {
      name: 'text',
      component: DynamicInputComponent
    },
    {
      name: 'number',
      component: DynamicInputComponent
    },
    {
      name: 'select',
      component: DynamicSelectComponent
    },   
    {
      name: 'checkbox',
      component: DynamicCheckBoxComponent
    }
  ];

  /*ngOnChanges(changes: SimpleChanges): void {
    //  console.log("hay un cambio");
     // console.log(`cambio:`, this.user());
      this.fillForm();     
  }*/

   ngAfterViewInit(): void {
    this.registerDynamicFields();  
   } 
   
   ngOnInit(): void { 
     
     this.buildForm();
     
   }   

    // Método para cambiar el modo
    public toggleMode(): void {
      if (this.genericForm.editAdd === 'Add') {
        this.genericForm.editAdd = 'Edit';
      } else {
        this.genericForm.editAdd = 'Add';
      }
    }
 


  @ViewChild('dynamicInputContainer', { read: ViewContainerRef })
    dynamicInputContainer!: ViewContainerRef;

   public buildForm(){

     const formGroupFields:any = {};

     for (const field of this.genericForm.fields) {
       formGroupFields[field.field] = new FormControl("");        
     }
   
     this.genericForm.customFromGroup = new FormGroup(formGroupFields);

   }

 /*  public fillForm(): void{

   }*/

 /* getComponentByType(type: string): any {
    const componentDynamic = this.supportedDynamicComponents.find(c => c.name === type);
    return componentDynamic!.component || DynamicInputComponent;
  }*/

  public registerDynamicFields() {
    this.genericForm.fields.forEach(obj => {
      const componentConfig = this.supportedDynamicComponents.find(c => c.name === obj.type);
  
      if (componentConfig) {
        let dynamicComponentType: Type<any>;
  
        switch (componentConfig.name) {
          case 'text':
          case 'number':
            dynamicComponentType = DynamicInputComponent;
            break;
          case 'select':
            dynamicComponentType = DynamicSelectComponent;
            break;
          case 'checkbox':
            dynamicComponentType = DynamicCheckBoxComponent;
            break;
          default:
            console.error(`Unsupported dynamic component type: ${componentConfig.name}`);
            return;
        }
  
        const dynamicComponent = this.dynamicInputContainer.createComponent(dynamicComponentType);
        dynamicComponent.instance.field = obj;
  
        // Verifica si customFromGroup es definido antes de asignarlo
        if (this.genericForm.customFromGroup) {
          dynamicComponent.instance.customForm = this.genericForm.customFromGroup;
        } else {
          console.error('customFromGroup is undefined. Make sure it is properly initialized.');
        }
      }
    });
  }
  
  

  public clearForm(): void {
    if (this.genericForm.customFromGroup) {
    this.genericForm.customFromGroup.reset(); // Limpia el formulario
    }
    if (this.genericForm.editAdd === 'Edit') {
      // Puedes establecer los valores según los datos existentes en el modo de edición    
      this.genericForm.fields.forEach((field) => {
        if (field.value !== undefined) {
          if (this.genericForm.customFromGroup){
          this.genericForm.customFromGroup.get(field.field)?.setValue(field.value);}
        }
      });
    }
  }

  /*fill():void{
  }*/

  onSubmit():void{
    if(this.genericForm.submitFunction){
      this.genericForm.submitFunction( this.genericForm.customFromGroup);
    }

  }
  
  
  

    

    
  }








