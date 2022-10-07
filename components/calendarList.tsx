import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function CalendarList() {
  const { data } = useQuery(["personalCalendar"], () => {
    return fetch("/api/googleCalendarData").then((res) => res.json());
  });
  const calendarList = data?.events;
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-4xl font-bold">Calendar List</div>
      <div className="text-2xl font-bold">
        {calendarList?.map((item: any) => {
          const date = new Date(item.start.dateTime);
          const isToday = date.toDateString() === new Date().toDateString();
          return (
            <div
              key={item.id}
              className={isToday ? "bg-slate-50 opacity-30" : ""}
            >
              {item.summary} - {date.toLocaleDateString()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
