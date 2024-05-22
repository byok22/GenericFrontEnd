export interface FullCalendarInterface{    
    events:EventsFullCalendar[];
}

export interface EventsFullCalendar{
    title:string,
    start: Date,
    end?: Date,
    description: string    
}