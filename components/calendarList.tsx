import { useEffect, useState } from "react";

export default function CalendarList() {
  const [calendarList, setCalendarList] = useState({});
  const [update, setUpdate] = useState(true);
  // get a new background image every 1 minute
  useEffect(() => {
    const interval = setInterval(() => {
      setUpdate(!update);
    }, 60000);
    return () => clearInterval(interval);
  }, [update]);

  useEffect(() => {
    if (update) {
      fetch("api/googleCalendarData")
        .then((res) => res.json())
        .then((data) => {
          setCalendarList(data);
        });
    }
  }, [update]);

  console.log(calendarList);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-4xl font-bold">Calendar List</div>
      {/* <div className="text-2xl font-bold">
            {calendarList.items.map((item) => (
            <div key={item.id}>{item.summary}</div>
            ))}
        </div> */}
    </div>
  );
}
