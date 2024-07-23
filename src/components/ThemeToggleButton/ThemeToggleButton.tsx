import Box from '@mui/material/Box';    
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React from 'react';
import { Typography } from '@mui/material';
import {useMediaQuery} from '@mui/material';


export type ThemeToggleButtonProps = {
    ColorModeContext: React.Context<{ toggleColorMode: () => void }>;
}


const ThemeToggleButton = (props: ThemeToggleButtonProps) => {

    const mobileCheck = useMediaQuery('(min-width:500px)');
    const { ColorModeContext= React.createContext({ toggleColorMode: () => {} }) } = props;
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const mode = theme.palette.mode;

    return (

        <>
            {mobileCheck && (
                <Typography>{mode}</Typography>)
                }
            <IconButton sx={{mr: 2}} title={mode + ' mode'} aria-label={mode + ' mode button'} onClick={colorMode.toggleColorMode} color="inherit">
                {mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
            </IconButton>
        </>



    )

}

export default ThemeToggleButton;