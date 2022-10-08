import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
type CalendarProps = {
  eventList: any[];
};
interface Event {
  title: string;
  start: Date;
  end: Date;
  color: string;
  allDay?: boolean;
}

const getFormattedEvents = (eventList: any[]): Event[] => {
  const formattedEvents: Event[] = eventList.map((event): Event => {
    const startTime = new Date(event.start.dateTime);
    const endTime = new Date(event.end.dateTime);

    const newEvent = {
      title: event.summary,
      start: startTime,
      end: endTime,
      color: event.eventColor,
    };
    return newEvent;
  });
  return formattedEvents;
};

export function DayCalendar({ eventList }: CalendarProps) {
  //   console.log(eventList);
  const formattedEventList =
    eventList && eventList.length > 0 ? getFormattedEvents(eventList) : [];
  return (
    <div className="col-span-1">
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin]}
        initialView="timeGrid"
        events={formattedEventList}
        locale="en"
        height="auto"
        aspectRatio={5}
        dayCount={2}
        headerToolbar={false}
      />
    </div>
  );
}

export function MonthCalendar({ eventList }: CalendarProps) {
  //   console.log(eventList);
  const formattedEventList =
    eventList && eventList.length > 0 ? getFormattedEvents(eventList) : [];
  return (
    <div className="col-span-4">
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin]}
        initialView="dayGridMonth"
        events={formattedEventList}
        locale="en"
        height="auto"
        aspectRatio={1}
        headerToolbar={false}
      />
    </div>
  );
}
