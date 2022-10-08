// import FullCalendar from "@fullcalendar/react"; // must go before plugins
// import timeGridPlugin from "@fullcalendar/timegrid";
// import dayGridPlugin from "@fullcalendar/daygrid";
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
    <div className="flex flex-col items-center justify-center">
      {/* <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin]}
        initialView="dayGridWeek"
        events={formattedEventList}
        locale="en"
        themeSystem="bootstrap5"
      /> */}
    </div>
  );
}
