import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicInputComponent } from '../dynamic-input/dynamic-input.component';
import { GenericFormFieldsInterface } from '../../generic-form.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dynamic-select',
  standalone: true,
  imports:[ReactiveFormsModule, CommonModule],
  templateUrl: './dynamic-select.component.html',
  styleUrls: ['./dynamic-select.component.scss']
})
export class DynamicSelectComponent implements OnInit {
  @Input() 
  customForm!: FormGroup;

  @Input()
  field!: GenericFormFieldsInterface;

  ngOnInit(): void {
    // Verificar si el control existe en el formulario
    if (this.customForm.get(this.field.field)) {
      this.customForm.patchValue({ [this.field.field]: this.field.value });
    }
  }

  hasError(controlName: string, errorName: string) {
    const control = this.customForm.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched) && control?.hasError(errorName);
  }
}