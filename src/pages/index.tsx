import Head from "next/head";
import Dashboard from "./dashboard/Dashboard";
import Header from "@/components/Header";
import SideMenu from"@/components/SideMenu";
import Login from "@/components/login";
import { useSession } from "next-auth/react";
import { Button } from "@mui/material";

export default function Home() {
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="MUI Data dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />

        {
          session &&(
            <>
        <SideMenu />
        <Dashboard />
            </>
          )}

          <Login />
      </main>
    </>
  );
}
