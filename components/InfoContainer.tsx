import { useQuery } from "@tanstack/react-query";
const fifteenMinutes = 1000 * 60 * 15;
import Weather from "./weather";
import DisplayTodoistShoppingList from "./displayTodoistShoppingList";
import { DayCalendar, MonthCalendar } from "./calendar";
import { calendarRefetchTime } from "../constants";

export default function InfoContainer() {
  const { data } = useQuery(
    ["Calendars"],
    () => {
      return fetch("/api/googleCalendarData").then((res) => res.json());
    },
    {
      refetchInterval: calendarRefetchTime,
    }
  );

  const calendarList: any = data?.events;

  return (
    <div className="grid grid-cols-6 gap-6 w-full">
      <DayCalendar eventList={calendarList} />
      <div>
        <Weather />
        <DisplayTodoistShoppingList />
      </div>
      <MonthCalendar eventList={calendarList} />
    </div>
  );
}
