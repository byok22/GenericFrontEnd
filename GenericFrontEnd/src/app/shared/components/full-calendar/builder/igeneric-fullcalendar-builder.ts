import { EventsFullCalendar, FullCalendarInterface } from "../fullcalendar.interface";

export interface IGenericFullCalendarBuilder{
    Reset():void;    
    SetEvent(event:EventsFullCalendar): void;  
    Generate(): FullCalendarInterface;
}