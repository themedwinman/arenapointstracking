import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useSession, signIn, signOut } from 'next-auth/react';
import { InputProps } from '@mui/material';
import ThemeToggleButton from '../ThemeToggleButton';
import { useMediaQuery } from '@mui/material';
import NextLink from "next/link";
import { useTheme } from '@mui/material';
import { useUser } from '@/context/UserContext';

export type HeaderProps = {
  ColorModeContext: React.Context<{ toggleColorMode: () => void }>;
}


// Header component which displays the header of the application
const Header = (props: HeaderProps) => {
  const { ColorModeContext } = props;
  const { data: session } = useSession();
  const userProfileImg = (session?.user as any)?.image as string || '/default-profile.png';
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const userRole = (session?.user as any)?.role as string || 'Guest';
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
    
  };

  // mobile menu
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const tabletCheck = useMediaQuery('(min-width:768px)');

  // return the header component
  return (
    // Creates the header component, makes it sticky and sets the margin bottom to 40px
    <AppBar position="sticky" sx={{marginBottom: "40px"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="../"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Arena
          </Typography>

          
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          {/* The main logo for the app in the top left. */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Arena
          </Typography>
            {
            tabletCheck && (
              <Box sx={{ flexGrow: 1 }} />
            
            )}


          <ThemeToggleButton ColorModeContext={ColorModeContext}/>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile Menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* diosplays the users google profile picture */}
                <Avatar alt={session?.user?.name as string} src={userProfileImg} />
              </IconButton>
            </Tooltip>
            <Menu
              disableScrollLock={ true }
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                    <MenuItem>
                <NextLink
                  href={"/dashboard/profile"}
                  style={{
                    color: theme.palette.text.primary,
                    textDecoration: "none",
                  }}
                >
                  <Typography textAlign="center">Profile</Typography>
                </NextLink>
              </MenuItem>
              <MenuItem>
              {/* Provides the user role within the menu. */}
              Your Role: {userRole.charAt(0).toUpperCase() + userRole.slice(1, 5) + ' ' + userRole.charAt(5).toUpperCase() + userRole.slice(6)}
              </MenuItem>
                <MenuItem onClick={() => session ? signOut() : signIn()}>
                  <Typography textAlign="center" sx={{color: session ? theme.palette.error.main : theme.palette.success.main}}>{session ? "Logout" : "Login"}</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
