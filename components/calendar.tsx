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
    let startTime = new Date(event.start.dateTime);
    let endTime = new Date(event.end.dateTime);
    const allDay = event.start.date ? true : false;
    if (event.start.date) {
      // add 1 day to start and end times if all day event
      const startDate = new Date(event.start.date);
      const endDate = new Date(event.end.date);
      startTime = new Date(startDate.setDate(startDate.getDate() + 1));
      endTime = new Date(endDate.setDate(endDate.getDate() + 1));
    }
    const newEvent = {
      title: event.summary,
      start: startTime,
      end: endTime,
      color: event.eventColor,
      allDay,
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
        nowIndicator={true}
        now={new Date()}
        dayHeaderClassNames={["text-black"]}
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
        nowIndicator={true}
        now={new Date()}
        dayHeaderClassNames={["text-black"]}
      />
    </div>
  );
}
