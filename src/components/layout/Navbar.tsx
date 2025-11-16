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
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 72 }}>

            {/* LOGO */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <School sx={{ color: '#F97316', fontSize: 26, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 3,
                  fontWeight: 700,
                  color: '#1F2937',
                  fontSize: '1.15rem',
                  cursor: 'pointer',
                }}
                onClick={() => navigate('/')}
              >
                StudySpark
              </Typography>
            </Box>

            {/* RIGHT GROUP */}
            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>

              {/* DESKTOP LINK */}
              {isDesktop && (
                <>
                  <Button
                    sx={{
                      fontWeight: isActive('/') ? 700 : 500,
                      textTransform: 'none',
                      color: isActive('/') ? '#F97316' : '#6B7280',
                    }}
                    onClick={() => navigate('/')}
                  >
                    Dashboard
                  </Button>

                  <Button
                    sx={{
                      fontWeight: isActive('/library') ? 700 : 500,
                      textTransform: 'none',
                      color: isActive('/library') ? '#F97316' : '#6B7280',
                    }}
                    onClick={() => navigate('/library')}
                  >
                    My Library
                  </Button>

                  {/* ✅ ADD TASKS BUTTON HERE */}
                  <Button
                    sx={{
                      fontWeight: isActive('/tasks') ? 700 : 500,
                      textTransform: 'none',
                      color: isActive('/tasks') ? '#F97316' : '#6B7280',
                    }}
                    onClick={() => navigate('/tasks')}
                  >
                    My Tasks
                  </Button>
                </>
              )}

              {/* NOTIFICATIONS */}
              <IconButton>
                <NotificationsOutlined sx={{ color: '#6B7280' }} />
              </IconButton>

              {/* USER AVATAR */}
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  alt="User"
                  src="/static/images/avatar/1.jpg"
                  sx={{
                    width: 38,
                    height: 38,
                    border: '2px solid #FCD34D',
                    boxShadow: '0 0 0 3px rgba(252, 211, 77, 0.3)',
                  }}
                />
              </IconButton>

              {/* MOBILE MENU */}
              {isMobile && (
                <IconButton onClick={toggleDrawer(true)}>
                  <MenuIcon sx={{ color: '#1F2937' }} />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 260, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Menu
          </Typography>

          <List>

            {/* DASHBOARD */}
            <ListItem disablePadding>
              <ListItemButton
                sx={{ background: isActive('/') ? 'rgba(62,142,222,0.1)' : 'transparent' }}
                onClick={() => {
                  navigate('/');
                  setOpen(false);
                }}
              >
                <ListItemText
                  primary="Dashboard"
                  primaryTypographyProps={{
                    fontWeight: isActive('/') ? 700 : 500,
                    color: isActive('/') ? '#F97316' : '#1F2937',
                  }}
                />
              </ListItemButton>
            </ListItem>

            {/* LIBRARY */}
            <ListItem disablePadding>
              <ListItemButton
                sx={{ background: isActive('/library') ? 'rgba(62,142,222,0.1)' : 'transparent' }}
                onClick={() => {
                  navigate('/library');
                  setOpen(false);
                }}
              >
                <ListItemText
                  primary="My Library"
                  primaryTypographyProps={{
                    fontWeight: isActive('/library') ? 700 : 500,
                    color: isActive('/library') ? '#F97316' : '#1F2937',
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                sx={{ background: isActive('/tasks') ? 'rgba(62,142,222,0.1)' : 'transparent' }}
                onClick={() => {
                  navigate('/tasks');
                  setOpen(false);
                }}
              >
                <ListItemText
                  primary="My Task"
                  primaryTypographyProps={{
                    fontWeight: isActive('/tasks') ? 700 : 500,
                    color: isActive('/tasks') ? '#F97316' : '#1F2937',
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
