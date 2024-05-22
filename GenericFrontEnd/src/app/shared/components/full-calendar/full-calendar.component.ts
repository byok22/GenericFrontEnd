import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { FullCalendarInterface } from './fullcalendar.interface';


@Component({
  selector: 'full-calendar-app',
  standalone: true,
  imports: [
    CommonModule,
    FullCalendarModule,

    
  ],
  template: `<p>full-calendar works!</p>`,
  styleUrl: './full-calendar.component.css',
  templateUrl: './full-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullCalendarComponent implements OnInit {
  @Input()  eventsMain!: FullCalendarInterface;
  public events:any[]=[];

  ngOnInit(): void {
    this.events = this.eventsMain.events.map((item)=>{
      return{
        title: item.title,
        start: item.start,
        end: item.end,
        description: item.description
      }
    });
  }
  
  public options?: CalendarOptions =
  {
    plugins: [dayGridPlugin, timeGridPlugin,interactionPlugin],     
    initialView: 'dayGridMonth',
    locale: esLocale,
    headerToolbar:{  left:'prev,next',
      center: 'title',
      right:'dayGridMonth,timeGridWeek,timeGridDay,today'
      }
      , 
    weekends: true,
    editable: false
  };
   
}
