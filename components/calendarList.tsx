import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
const fifteenMinutes = 1000 * 60 * 15;
import { calendar_v3, google } from "googleapis";
import Weather from "./weather";
import DisplayTodoistShoppingList from "./displayTodoistShoppingList";

export default function CalendarList() {
  const { data } = useQuery(
    ["Calendars"],
    () => {
      return fetch("/api/googleCalendarData").then((res) => res.json());
    },
    {
      refetchInterval: fifteenMinutes,
    }
  );

  const calendarList: any = data?.events;

  const pastEvents = calendarList?.filter((event: any) => {
    const eventDate = new Date(event?.start?.dateTime);
    const now = new Date();
    return eventDate < now;
  });
  const todayEvents = calendarList?.filter((event: any) => {
    const eventDate = new Date(event.start.dateTime);
    const now = new Date();
    return eventDate.getDate() === now.getDate();
  });

  const futureEvents = calendarList?.filter((event: any) => {
    const eventDate = new Date(event.start.dateTime);
    const now = new Date();
    return eventDate > now;
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-4xl font-bold">Calendar List</div>
      <div className="text-2xl font-bold grid grid-cols-3">
        <div className="flex flex-col justify-start align-start">
          <div>Past</div>
          {pastEvents?.map((item: any) => {
            return (
              <div key={item.id} className=" opacity-70">
                {item.summary}
              </div>
            );
          })}
          <DisplayTodoistShoppingList />
        </div>
        <div>
          <div>Today</div>
          <Weather />
          {todayEvents?.map((item: any) => {
            return (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center"
              >
                {item.summary} -{" "}
                {new Date(item.start.dateTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            );
          })}
        </div>
        <div>
          <div>Future</div>
          {futureEvents?.map((item: any) => {
            const timeUntilEvent =
              new Date(item.start.dateTime).getTime() - Date.now();
            const hoursUntilEvent = Math.floor(
              timeUntilEvent / (1000 * 60 * 60)
            );
            const timeToDisplay =
              hoursUntilEvent > 0
                ? `${hoursUntilEvent} hours`
                : `${Math.floor(timeUntilEvent / (1000 * 60))} minutes`;
            return (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center"
              >
                {item.summary} -{" "}
                {hoursUntilEvent < 25
                  ? `${timeToDisplay} hours - `
                  : new Date(item.start.dateTime).toLocaleDateString()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
