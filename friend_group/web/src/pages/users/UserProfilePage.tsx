import React, { useContext } from 'react';
import { Container, Typography, Card, CardContent, Avatar, Box, Grid } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

const UserProfilePage: React.FC = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <Container sx={{ textAlign: 'center', p: 4 }}>
        <Typography variant="h6" color="error">
          No user information available.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ p: 4, maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 0, color: 'primary.main' }}>
        Profile
      </Typography>
      <Typography variant="subtitle2" color="textSecondary" sx={{ marginBottom: 4 }}>
        View and manage your profile information
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <Avatar
                alt={user.username}
                src={user.profile_picture || '/api/placeholder/150/150'}
                sx={{
                  width: 120,
                  height: 120,
                  margin: '0 auto 2rem',
                  border: '4px solid',
                  borderColor: 'primary.main',
                }}
              />
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                {user.username || 'N/A'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Member since {new Date().getFullYear()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card elevation={3} sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
                Profile Information
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
                <AccountCircleIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Username
                  </Typography>
                  <Typography variant="body1">
                    {user.username || 'N/A'}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
                <EmailIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Email Address
                  </Typography>
                  <Typography variant="body1">
                    {user.email || 'N/A'}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                <PersonIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    About Me
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {user.bio || 'No bio available.'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfilePage;