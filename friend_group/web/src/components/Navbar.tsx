import React, { useContext } from 'react';
import { alpha, styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Container,
  Drawer,
  MenuItem,
  Divider
} from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeSelect from '../theme/ColorModeSelect';
import { FriendGroupIcon } from './Icon/FriendGroup';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StyledToolbar = styled(Toolbar)(({ theme }: { theme: any }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme
    ? `rgba(${theme.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: '8px 12px',
}));

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="sticky"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Box component={Link} to="/dashboard" sx={{ textDecoration: 'none' }}>
              <FriendGroupIcon />
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {isAuthenticated ? (
                <>
                  <Button
                    component={Link}
                    to="/dashboard"
                    variant="text"
                    color="info"
                    size="small"
                  >
                    Dashboard
                  </Button>
                  <Button
                    component={Link}
                    to="/profile"
                    variant="text"
                    color="info"
                    size="small"
                  >
                    Profile
                  </Button>
                  <Button
                    component={Link}
                    to="/payments"
                    variant="text"
                    color="info"
                    size="small"
                  >
                    Payments
                  </Button>
                </>
              ) : null}
            </Box>
          </Box>

          {/* Desktop Right Side */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            {isAuthenticated ? (
              <>
                <Button
                  onClick={logout}
                  color="primary"
                  variant="text"
                  size="small"
                >
                  Logout
                </Button>
                <ColorModeSelect />
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/"
                  color="primary"
                  variant="text"
                  size="small"
                >
                  Sign in
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  color="primary"
                  variant="contained"
                  size="small"
                >
                  Sign up
                </Button>
                <ColorModeSelect />
              </>
            )}
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeSelect />
            <IconButton
              aria-label="Menu button"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                {isAuthenticated ? (
                  <>
                    <MenuItem component={Link} to="/dashboard">Dashboard</MenuItem>
                    <MenuItem component={Link} to="/profile">Profile</MenuItem>
                    <MenuItem component={Link} to="/payments">Payments</MenuItem>
                    <Divider sx={{ my: 3 }} />
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="outlined"
                        fullWidth
                        onClick={logout}
                      >
                        Logout
                      </Button>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <Divider sx={{ my: 3 }} />
                    <MenuItem>
                      <Button
                        component={Link}
                        to="/signup"
                        color="primary"
                        variant="contained"
                        fullWidth
                      >
                        Sign up
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        component={Link}
                        to="/"
                        color="primary"
                        variant="outlined"
                        fullWidth
                      >
                        Sign in
                      </Button>
                    </MenuItem>
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;