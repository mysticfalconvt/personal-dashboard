import { useQuery } from "@tanstack/react-query";
import Weather from "./weather";
import DisplayTodoistShoppingList from "./displayTodoistShoppingList";
import { DayCalendar, MonthCalendar } from "./calendar";
import { calendarRefetchTime } from "../constants";
import { useTextTheme } from "../hooks/useTextTheme";
import Background from "./background";

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

  const { theme, setTextTheme } = useTextTheme();

  const calendarList: any = data?.events;

  return (
    <>
      <Background setTheme={setTextTheme} />
      <div className={`grid grid-cols-6 gap-6 w-full z-10 ${theme}`}>
        <DayCalendar eventList={calendarList} />
        <div>
          <Weather />
          <DisplayTodoistShoppingList />
        </div>
        <MonthCalendar eventList={calendarList} />
      </div>
    </>
  );
}
