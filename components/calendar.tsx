import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
type CalendarProps = {
  eventList: any[];
};

export default function Calendar({ eventList }: CalendarProps) {
  console.log(eventList);
  const formattedEventList =
    eventList?.map((event) => {
      const startTime = new Date(event.start.dateTime);
      const endTime = new Date(event.end.dateTime);
      return {
        title: event.summary,
        start: startTime,
        end: endTime,
      };
    }) || [];
  return (
    <div className="w-full grid grid-cols-2 ">
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin]}
        initialView="timeGrid"
        events={formattedEventList}
        locale="en"
        // themeSystem="bootstrap5"
        height="auto"
        aspectRatio={5}
        dayCount={2}
        headerToolbar={false}
      />
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin]}
        initialView="dayGridMonth"
        events={formattedEventList}
        locale="en"
        // themeSystem="bootstrap5"
        height="auto"
        aspectRatio={1}
        headerToolbar={false}
      />
    </div>
  );
}
