import Box from '@mui/material/Box';    
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React from 'react';
import { Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';

export type ThemeToggleButtonProps = {
    ColorModeContext: React.Context<{ toggleColorMode: () => void }>;
}

const ThemeToggleButton = (props: ThemeToggleButtonProps) => {
    // defines queries for different devices so that component will display correctly on different devices
    const mobileCheck = useMediaQuery('(min-width:500px)');
    const { ColorModeContext = React.createContext({ toggleColorMode: () => {} }) } = props;
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const mode = theme.palette.mode;

    // Capitalize the first letter of the mode
    const capitalizedMode = mode.charAt(0).toUpperCase() + mode.slice(1);

    return (
        <>
            {mobileCheck && (
                <Typography>{capitalizedMode}</Typography>
            )}
            {/* Creates the actual button for switching themes */}
            <IconButton
                sx={{ mr: 2 }}
                title={capitalizedMode + ' mode'}
                aria-label={capitalizedMode + ' mode button'}
                onClick={colorMode.toggleColorMode}
                color="inherit"
            >
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </>
    )
}

export default ThemeToggleButton;