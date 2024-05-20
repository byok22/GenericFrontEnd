import { FormGroup, Validators } from "@angular/forms";
import { SelectOption } from "../../interfaces/select-option.interface";

export interface GenericFormInterface<T> {

    tittle: string;
    data?: T;
    editAdd:string;
    fields:GenericFormFieldsInterface []; 
    customFromGroup?: FormGroup;
    submitFunction?: any;  
}

export interface GenericFormFieldsInterface {

    field:string;
    value?:string|number|Date|boolean;
    label:string;
    type:string;
    options?: SelectOption[];
    show?:boolean;
    enable?: boolean;
    validationRequired: boolean;
    required:boolean;
    validatorType?: Validators;   
    order:number;  
}
