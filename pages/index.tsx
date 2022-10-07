import { H1 } from "@blueprintjs/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import Background from "../components/background";
import CalendarList from "../components/calendarList";
import Weather from "../components/weather";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DisplayTodoistShoppingList from "../components/displayTodoistShoppingList";

const Home: NextPage = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <Head>
          <title>Rob's Stuff</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Background />
        <main className="flex w-full flex-1 flex-col items-center justify-start px-20 text-center z-10">
          <H1 className="text-6xl font-bold">Dashboard</H1>
          <div className="grid grid-cols-3 gap-4 items-start">
            <CalendarList />
            <Weather />
            <DisplayTodoistShoppingList />
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default Home;
