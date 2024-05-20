import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SelectOption } from '../../interfaces/select-option.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'select-dropdown',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.css']
})
export class SelectDropdownComponent implements OnInit {
  ngOnInit(): void {
    this.initializeSelectedOption();
    console.log(this.label);
    console.log(this.options);
    console.log(this.selectedOption);
  }

  @Input() label: string = '';
  @Input() options: SelectOption[] = [];
  @Output() onChange = new EventEmitter<SelectOption>();

  selectId: string = `select-${Math.random().toString(36).substring(2, 9)}`;
  @Input() selectedOption: SelectOption = { id: '', text: '' };

  onSelectionChange(event: any) {
    const selectedId = event.target.value;
    this.selectedOption = this.options.find(option => option.id === selectedId) || { id: '', text: '' };
    this.onChange.emit(this.selectedOption);
  }

  private initializeSelectedOption(): void {
    if (!this.selectedOption || !this.options.some(option => option.id === this.selectedOption.id)) {
      this.selectedOption = this.options[0] || { id: '', text: '' };
      this.onChange.emit(this.selectedOption);
    }
  }
}
