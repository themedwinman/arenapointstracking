import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import Login from "@/components/login";
import { ScreenShareSharp } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Dashboard from "./dashboard/Dashboard";
import scss from './home.module.scss';
import React from "react";

const Home: React.FC = () => {
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Arena - Dashboard</title>
        <meta name="description" content="MUI Data dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={scss.main}>

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

export default Home;
