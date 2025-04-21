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
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import NavButton from './NavButton';
import { useAuth } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@mui/icons-material';
import { LoginOutlined } from '@ant-design/icons';

import { CaretDownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import axios from 'axios';

const titleStyle = {
  fontFamily: "'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none',
}


const pages = ['Home', 'Lost', 'Found', 'Post Item', 'My Listings'];
const settings = ['Profile', 'Dashboard', 'Logout'];


function Navbar() {

  const [image, setImage] = React.useState('');

  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    navigate("/")
    logout();
  };

  const settingActions: Record<string, () => void> = {
    Profile: () => navigate('/profile'),
    Dashboard: () => navigate('/mylistings'),
    Logout: handleLogout,
  };

  const navigate = useNavigate();


  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  React.useEffect(() => {
    const fetchDetails = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}`);
        setImage(response.data.userData.img);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    if (isAuthenticated) {
      fetchDetails();
    }
  }, [isAuthenticated]);


  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <NavButton to="/lostitems" style={{ letterSpacing: '0.08rem', fontSize: '0.95rem', marginTop: 2, marginBottom: 2, fontWeight: 500, padding: '0px 0px', color: 'rgb(8, 103, 176)', textTransform: 'capitalize' }} onClick={handleCloseNavMenu}>Lost Items</NavButton>
      )
    },
    {
      key: '2',
      label: (
        <NavButton to="/founditems" style={{ letterSpacing: '.08rem', fontSize: '0.95rem', marginTop: 2, marginBottom: 2, fontWeight: 500, padding: '0px 0px', color: 'rgb(8, 103, 176)', textTransform: 'capitalize' }} onClick={handleCloseNavMenu}>Found Items</NavButton>
      )
    },
  ];


  return (
    <>
      <AppBar
        elevation={8}
        sx={{
          background: 'linear-gradient(75deg,rgb(8, 103, 176),rgb(44, 158, 88))',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }
        }}
        position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                ...titleStyle,
                mr: 2,
                padding: 1.5,
                background: "linear-gradient(85deg, rgb(8, 103, 176),rgb(44, 158, 88))",
                borderRadius: '42px',
                display: { xs: 'none', md: 'flex' },

              }}
            >
              <Typography sx={{ ...titleStyle, color: 'rgb(61, 171, 10)', fontSize: '20px' }}>LOST</Typography>
              <SearchOutlined style={{ alignItems: 'center', marginTop: 4, marginLeft: 2, marginRight: 6 }} />
              <Typography sx={{ ...titleStyle, color: 'rgb(12, 76, 125)', fontSize: '20px' }}>FOUND</Typography>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
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
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <NavButton to="/" onClick={handleCloseNavMenu}>Home</NavButton>
              <NavButton to="/about" onClick={handleCloseNavMenu}>About</NavButton>

              {
                isAuthenticated ? (
                  <>
                    <Dropdown menu={{ items }}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space style={{ marginTop: 27.1, letterSpacing: '.15rem', color: 'white', fontSize: '1rem', fontWeight: 500, marginLeft: 16, marginRight: 16, fontFamily: "'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'" }}>
                          BROWSE ITEMS
                          <CaretDownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                    <NavButton to="/postitem" onClick={handleCloseNavMenu}>Post Item</NavButton>
                    <NavButton to="/mylistings" onClick={handleCloseNavMenu}>My Listings</NavButton>
                    <NavButton to="/contact" onClick={handleCloseNavMenu}>Contact</NavButton>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ marginLeft: 18, p: 0 }}>
                        <Avatar alt="Remy Sharp" src={`${image}`} />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <NavButton to="/contact" onClick={handleCloseNavMenu}>Contact</NavButton>
                    <Box
                      component={Link}
                      to="/signin"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: '0px',
                        ml: '630px',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          transition: '0.3s ease-in-out',
                          color: '#f0f0f0',
                        }
                      }}
                    >
                      <LoginOutlined
                        style={{
                          fontSize: 30,
                          color: 'white',
                        }}
                      />
                    </Box>
                  </>
                )
              }

            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Menu
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
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu();
                      const action = settingActions[setting];
                      if (action) action();
                    }}
                  >
                    <Typography sx={{ fontFamily: "'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'", textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}

              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>

  );
}
export default Navbar;

