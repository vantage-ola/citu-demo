import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5">Please log in to access your dashboard.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Welcome, {user.username}!</Typography>
      <Typography variant="subtitle1">Your role: {user.is_speaker ? 'Guest Speaker' : 'Group Member'}</Typography>

      <List>
        {!user.is_speaker && (
          <>
            <ListItem button component={Link} to="/groups">
              <ListItemText primary="Manage Groups" />
            </ListItem>
            <ListItem button component={Link} to="/events">
              <ListItemText primary="Organize Events" />
            </ListItem>
            <ListItem button component={Link} to="/speakers">
              <ListItemText primary="Browse Speakers" />
            </ListItem>
          </>
        )}
        {user.is_speaker && (
          <>
            <ListItem button component={Link} to="/profile">
              <ListItemText primary="Manage Profile" />
            </ListItem>
            <ListItem button component={Link} to="/availability">
              <ListItemText primary="Set Availability" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );
};

export default DashboardPage;
