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

function Navbar(): React.JSX.Element {
  const theme = useTheme();

  // Breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // mobile + tablet
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));   // desktop

  // Drawer state
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (value: boolean) => () => {
    setOpen(value);
  };

  const menuItems = ['Dashboard', 'My Library', 'Analytics', 'Settings'];

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
            
            {/* LEFT: LOGO */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <School sx={{ color: '#3E8EDE', fontSize: 26, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 3,
                  fontWeight: 700,
                  color: '#1F2937',
                  textDecoration: 'none',
                  fontSize: '1.15rem',
                }}
              >
                StudySpark
              </Typography>
            </Box>

            {/* RIGHT SIDE */}
            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
              
              {/* DESKTOP MENU */}
              {isDesktop && (
                <>
                  <Button sx={{ color: '#3E8EDE', fontWeight: 600, textTransform: 'none' }}>
                    Dashboard
                  </Button>

                  <Button sx={{ color: '#6B7280', fontWeight: 500, textTransform: 'none' }}>
                    My Library
                  </Button>

                  <Button sx={{ color: '#6B7280', fontWeight: 500, textTransform: 'none' }}>
                    Analytics
                  </Button>

                  <Button sx={{ color: '#6B7280', fontWeight: 500, textTransform: 'none' }}>
                    Settings
                  </Button>
                </>
              )}

              {/* NOTIF ICON (always visible) */}
              <IconButton>
                <NotificationsOutlined sx={{ color: '#6B7280' }} />
              </IconButton>

              {/* AVATAR (always visible) */}
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  alt="Alex"
                  src="/static/images/avatar/1.jpg"
                  sx={{
                    width: 38,
                    height: 38,
                    border: '2px solid #FCD34D',
                    boxShadow: '0 0 0 3px rgba(252, 211, 77, 0.3)',
                  }}
                />
              </IconButton>

              {/* HAMBURGER MENU (only mobile/tablet) */}
              {isMobile && (
                <IconButton onClick={toggleDrawer(true)}>
                  <MenuIcon sx={{ color: '#1F2937' }} />
                </IconButton>
              )}

            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* DRAWER FOR MOBILE */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 260, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Menu
          </Typography>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
