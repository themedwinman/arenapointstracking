import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Component } from "react";
import type { AppProps } from "next/app";
import { Session } from 'next-auth';

interface CustomPageProps {
  session: Session;
}

export default function App({
  Component, pageProps: { session, ...pageProps} 
}: AppProps<CustomPageProps>){ 
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
