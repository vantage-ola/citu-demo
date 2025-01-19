import React, { useContext } from 'react';
import { Container, Typography, Card, CardContent, Avatar, Box } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';

const UserProfilePage: React.FC = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <Container sx={{ textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          No user information available.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ p: 2 }}>
      <Card elevation={3} sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
        <Box
          sx={{
            background: 'linear-gradient(90deg, #4b79a1, #283e51)',
            color: '#fff',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          <Avatar
            alt={user.username}
            src={user.profile_picture || 'https://via.placeholder.com/150'}
            sx={{
              width: 100,
              height: 100,
              margin: '0 auto 1rem',
              border: '2px solid #fff',
            }}
          />
          <Typography variant="h5" fontWeight="bold">
            {user.username || 'N/A'}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {user.email || 'N/A'}
          </Typography>
        </Box>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
            About Me
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {user.bio || 'No bio available.'}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserProfilePage;
