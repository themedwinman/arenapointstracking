import { CssBaseline, IconButton, ThemeProvider, createTheme, useTheme } from "@mui/material";
import { Session } from 'next-auth';
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import React, { Component } from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Brightness7 } from "@mui/icons-material";
import Box from "@mui/material/Box";
import darkTheme from "@/theme/darkTheme";
import lightTheme from "@/theme/lightTheme";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import 'dotenv/config';
import { UserProvider } from "@/context/UserContext";


interface CustomPageProps {
  session: Session;
}

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });


// App component
const App = ({
  Component, pageProps: { session, ...pageProps },
}: AppProps) => {


// create the color mode context

    const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
    const colorMode = React.useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
      }),
      [],
    );

// create the dark and light themes
    const darkThemeChosen = React.useMemo(
      () =>
        createTheme({
            ...darkTheme
        })
    ,[mode]
    )


    const lightThemeChosen = React.useMemo(
      () =>
        createTheme({
            ...lightTheme
        })
    ,[mode]
    )

  return (
    
// return the app components with the wrappers.
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={mode === 'dark' ? darkThemeChosen : lightThemeChosen}>

    <SessionProvider session={session}>
      <CssBaseline />
      <Header ColorModeContext={ColorModeContext}/>
      <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </UserProvider>
    </SessionProvider>
    </ThemeProvider>
    </ColorModeContext.Provider>



  );
};

export default App;