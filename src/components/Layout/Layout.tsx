import SideMenu from "../SideMenu";
import scss from "./Layout.module.scss";
import { useSession } from "next-auth/react";
import React from "react";
import Head from "next/head";


// defines the layout component for the application to ensure all pages keep the same styling
const Layout = (props: any) => {
    const { data: session } = useSession();

    return(
        <>
        {/* makes the header stay across all pages */}
        <Head>
            <title>Arena - Dashboard</title>
            <meta name="description" content="MUI Data dashboard" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={scss.layout}>
            {/* puts the sidemenu on all pages */}
            {session && <SideMenu />}
            {props.children}
        </main>

        </>
    )}

    export default Layout;
