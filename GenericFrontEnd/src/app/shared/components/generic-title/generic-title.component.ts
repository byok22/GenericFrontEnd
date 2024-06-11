import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'shared-generic-title',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './generic-title.component.html',
  styleUrl: './generic-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericTitleComponent {
  @Input() valor?:string ='';

 }
