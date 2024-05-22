import { EventsFullCalendar, FullCalendarInterface } from "../fullcalendar.interface";
import { IGenericFullCalendarBuilder } from "./igeneric-fullcalendar-builder";

export class GenericFullCalendarConcretBuilder implements IGenericFullCalendarBuilder
{
    private _genericFullCalendar!: FullCalendarInterface
    Reset(): void {
        this._genericFullCalendar ={
            events:[]
        };
    }
    SetEvent(event: EventsFullCalendar): void {
        this._genericFullCalendar.events.push(event)
    }
    Generate(): FullCalendarInterface {
        return this._genericFullCalendar;
    }

}