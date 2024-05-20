import { FormGroup } from "@angular/forms";
import { GenericFormFieldsInterface, GenericFormInterface } from "../generic-form.interface";
import { IBuilderGenericForm } from "./ibuilder-generic-form.interface";
import { Input } from "@angular/core";

export class GenericFormConcretBuilder<T> implements IBuilderGenericForm<T>{
   

    private _genericForm!: GenericFormInterface<T>;

    Reset(): void {
        this._genericForm = {
            editAdd:'',
            tittle:'',
            customFromGroup:undefined,
             fields: []

        }
      }
    SetTitle(tittle: string): void {
       this._genericForm.tittle = tittle;
    }
    SetData(data: T){
        this._genericForm.data =data;
    }
    SetField(field: GenericFormFieldsInterface): void {
       this._genericForm.fields.push(field);
    }
    SetFormGroup(customFormGroup: FormGroup<any>): void {
        this._genericForm.customFromGroup=customFormGroup;
    }
    SetSubmitFunction(oneFunction: any): void {
        this._genericForm.submitFunction= oneFunction.bind(this);
    }
    SetEditAdd(editAdd: string): void {
        this._genericForm.editAdd = editAdd;
    }
    Generate(): GenericFormInterface<T> {
        this._genericForm.fields.sort((a, b) => a.order - b.order);
        return this._genericForm;
    }
   
    
}