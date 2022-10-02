import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Background from "../components/background";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Rob's Stuff</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Background />
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center z-10">
        <h1 className="text-6xl font-bold">Dashboard</h1>
      </main>
    </div>
  );
};

export default Home;
