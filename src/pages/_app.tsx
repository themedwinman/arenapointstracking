import { SessionProvider } from "next-auth/react";
import { Component } from "react";
import type { AppProps } from "next/app";
import { Session } from 'next-auth';
import { CssBaseline } from "@mui/material";

interface CustomPageProps {
  session: Session;
}

export default function App({
  Component, pageProps: { session, ...pageProps} 
}: AppProps<CustomPageProps>){ 
  return (
    <SessionProvider session={session}>
      <CssBaseline />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
