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



interface CustomPageProps {
  session: Session;
}

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });




const App = ({
  Component, pageProps: { session, ...pageProps },
}: AppProps) => {




    const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
    const colorMode = React.useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
      }),
      [],
    );


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
    

    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={mode === 'dark' ? darkThemeChosen : lightThemeChosen}>

    <SessionProvider session={session}>
      <CssBaseline />
      <Header ColorModeContext={ColorModeContext}/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
    </ThemeProvider>
    </ColorModeContext.Provider>



  );
};

export default App;