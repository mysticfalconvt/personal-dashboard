import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import InfoContainer from "../components/InfoContainer";

const Home: NextPage = () => {
  const queryClient = new QueryClient();

  // const textColor = textTheme === "text-white" ? "text-black" : "text-white";

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="flex min-h-screen flex-col items-center justify-center py-2 ">
        <Head>
          <title>Boskind Family</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main
          className={`flex w-full flex-1 flex-col items-center justify-start px-20 text-center z-0`}
        >
          <InfoContainer />
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default Home;
