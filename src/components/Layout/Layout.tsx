import SideMenu from "../SideMenu";
import scss from "./Layout.module.scss";
import { useSession } from "next-auth/react";
import React from "react";
import Head from "next/head";
import Footer from "../Footer";
import DataRibbon from "../Dashboard/DataRibbon"

// defines the layout component for the application to ensure all pages keep the same styling
const Layout = (props: any) => {
    const { data: session } = useSession();

    return(
        <>

        <Head>
            <title>Arena - Dashboard</title>
            <meta name="description" content="Arena House Points Tracking" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main 
        className={scss.layout}
        style={{ padding: session ? "0 24px 0 80px" : 0 }}
        >
            {/* puts the sidemenu on all pages */}
            {session && <SideMenu />}
            {props.children}
            <Footer />
        </main>

        </>
    )}

    export default Layout;
