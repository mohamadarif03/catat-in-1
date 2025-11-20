import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Container,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { School, NotificationsOutlined, Menu as MenuIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar(): React.JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (value: boolean) => () => setOpen(value);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: '#1E293B', // Dark appbar
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          color: '#F1F5F9',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 72 }}>

            {/* LOGO */}
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                 onClick={() => navigate('/dashboard')}>
              <School sx={{ color: '#F97316', fontSize: 26, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 3,
                  fontWeight: 700,
                  color: '#F1F5F9',
                  fontSize: '1.15rem',
                }}
              >
                StudySpark
              </Typography>
            </Box>

            {/* RIGHT GROUP */}
            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>

              {isDesktop && (
                <>
                  <Button
                    sx={{
                      fontWeight: isActive('/dashboard') ? 700 : 500,
                      textTransform: 'none',
                      color: isActive('/dashboard') ? '#F97316' : '#CBD5E1',
                    }}
                    onClick={() => navigate('/dashboard')}
                  >
                    Dashboard
                  </Button>

                  <Button
                    sx={{
                      fontWeight: isActive('/library') ? 700 : 500,
                      textTransform: 'none',
                      color: isActive('/library') ? '#F97316' : '#CBD5E1',
                    }}
                    onClick={() => navigate('/library')}
                  >
                    My Library
                  </Button>

                  <Button
                    sx={{
                      fontWeight: isActive('/tasks') ? 700 : 500,
                      textTransform: 'none',
                      color: isActive('/tasks') ? '#F97316' : '#CBD5E1',
                    }}
                    onClick={() => navigate('/tasks')}
                  >
                    My Tasks
                  </Button>

                  <Button
                    sx={{
                      fontWeight: isActive('/progress') ? 700 : 500,
                      textTransform: 'none',
                      color: isActive('/progress') ? '#F97316' : '#CBD5E1',
                    }}
                    onClick={() => navigate('/progress')}
                  >
                    My Progress
                  </Button>
                </>
              )}

              {/* NOTIFICATION ICON */}
              <IconButton>
                <NotificationsOutlined sx={{ color: '#CBD5E1' }} />
              </IconButton>

              {/* AVATAR */}
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  alt="User"
                  src="/static/images/avatar/1.jpg"
                  sx={{
                    width: 38,
                    height: 38,
                    border: '2px solid #FACC15',
                    boxShadow: '0 0 0 3px rgba(250, 204, 21, 0.25)',
                  }}
                />
              </IconButton>

              {/* MOBILE MENU */}
              {isMobile && (
                <IconButton onClick={toggleDrawer(true)}>
                  <MenuIcon sx={{ color: '#F1F5F9' }} />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#0F172A', // Dark background
            color: '#F1F5F9',
            width: 260,
          },
        }}
      >
        <Box sx={{ width: 260, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Menu
          </Typography>

          <List>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  background: isActive('/dashboard')
                    ? 'rgba(249,115,22,0.15)'
                    : 'transparent',
                }}
                onClick={() => {
                  navigate('/dashboard');
                  setOpen(false);
                }}
              >
                <ListItemText
                  primary="Dashboard"
                  primaryTypographyProps={{
                    fontWeight: isActive('/dashboard') ? 700 : 500,
                    color: isActive('/dashboard') ? '#F97316' : '#E2E8F0',
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  background: isActive('/library')
                    ? 'rgba(249,115,22,0.15)'
                    : 'transparent',
                }}
                onClick={() => {
                  navigate('/library');
                  setOpen(false);
                }}
              >
                <ListItemText
                  primary="My Library"
                  primaryTypographyProps={{
                    fontWeight: isActive('/library') ? 700 : 500,
                    color: isActive('/library') ? '#F97316' : '#E2E8F0',
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  background: isActive('/tasks')
                    ? 'rgba(249,115,22,0.15)'
                    : 'transparent',
                }}
                onClick={() => {
                  navigate('/tasks');
                  setOpen(false);
                }}
              >
                <ListItemText
                  primary="My Task"
                  primaryTypographyProps={{
                    fontWeight: isActive('/tasks') ? 700 : 500,
                    color: isActive('/tasks') ? '#F97316' : '#E2E8F0',
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  background: isActive('/progress')
                    ? 'rgba(249,115,22,0.15)'
                    : 'transparent',
                }}
                onClick={() => {
                  navigate('/progress');
                  setOpen(false);
                }}
              >
                <ListItemText
                  primary="Progress"
                  primaryTypographyProps={{
                    fontWeight: isActive('/progress') ? 700 : 500,
                    color: isActive('/progress') ? '#F97316' : '#E2E8F0',
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
