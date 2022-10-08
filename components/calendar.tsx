import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
type CalendarProps = {
  eventList: any[];
};

export function DayCalendar({ eventList }: CalendarProps) {
  console.log(eventList);
  const formattedEventList =
    eventList?.map((event) => {
      const startTime = new Date(event.start.dateTime);
      const endTime = new Date(event.end.dateTime);

      return {
        title: event.summary,
        start: startTime,
        end: endTime,
        color: event.eventColor,
      };
    }) || [];
  return (
    <div className="col-span-2">
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
  console.log(eventList);
  const formattedEventList =
    eventList?.map((event) => {
      const startTime = new Date(event.start.dateTime);
      const endTime = new Date(event.end.dateTime);
      return {
        title: event.summary,
        start: startTime,
        end: endTime,
        color: event.eventColor,
      };
    }) || [];
  return (
    <div className="col-span-3">
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
