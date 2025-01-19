import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Box, Typography, Grid, Button, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Avatar, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { api } from '../services/API';
import { styled } from '@mui/material/styles';
import { SpeakerProfile } from '../utils/Types';

const StyledCard = styled(Card)`
  box-shadow: 3;
  border-radius: 2;
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const DashboardPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [speakerProfile, setSpeakerProfile] = useState<SpeakerProfile | null>(null);

  // dashboard management form data
  const [formData, setFormData] = useState({
    expertise: '',
    hourly_rate: 0,
    location: '',
  });

  useEffect(() => {
    const fetchSpeakerProfile = async () => {
      if (user && user.is_speaker) {
        try {
          const profiles = await api.getSpeakers();
          const userProfile = profiles.find(profile => profile.user.id === user.id);
          setSpeakerProfile(userProfile || null);
        } catch (error) {
          console.error('Error fetching speaker profile:', error);
        }
      }
    };

    fetchSpeakerProfile();
  }, [user]);

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', pt: 'calc(var(--template-frame-height, 0px) + 28px)' }}>
        <Typography variant="h5" color="textSecondary" align="center">Please log in to access your dashboard.</Typography>
      </Box>
    );
  }

  const getTimeOfDay = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const createSpeakerProfile = async () => {
    if (!formData.expertise || !formData.hourly_rate || !formData.location) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await api.createSpeakerProfile(
        formData.expertise,
        formData.hourly_rate,
        formData.location,
      );
      setDialogOpen(false);
      location.reload();
      setFormData({
        expertise: '',
        hourly_rate: 0,
        location: '',
      });
    } catch {
      alert('Speaker creation failed. Please try again.');
    }
  }

  return (
    <Box sx={{ p: 4, maxWidth: '1200px', margin: '0 auto', bgcolor: 'background.default', pt: 'em' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 0, color: 'primary.main' }}>
        {getTimeOfDay()}, {user.username}!
      </Typography>
      <Typography variant="subtitle2" color="textSecondary" sx={{ marginBottom: 4 }}>
        {user.is_speaker ? 'Guest Speaker' : 'Group Member'}
      </Typography>

      {/* Cards layout for easier access */}
      <Grid container spacing={4} justifyContent="center">
        {/* Common Cards */}
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Manage Groups</Typography>
              <Button
                component={Link}
                to="/groups"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ textTransform: 'none', padding: '12px', fontWeight: 'bold' }}
              >
                Go to Groups
              </Button>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Organize Events</Typography>
              <Button
                component={Link}
                to="/events"
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ textTransform: 'none', padding: '12px', fontWeight: 'bold' }}
              >
                Manage Events
              </Button>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Browse Speakers</Typography>
              <Button
                component={Link}
                to="/speakers"
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ textTransform: 'none', padding: '12px', fontWeight: 'bold' }}
              >
                Explore Speakers
              </Button>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Speaker Profile Card */}
        {user.is_speaker && (
          <Grid item xs={12} sm={6} md={4}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Speaker Profile</Typography>
                {speakerProfile ? (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{speakerProfile.user.username.charAt(0).toUpperCase()}</Avatar>
                      <Typography variant="h6">{speakerProfile.user.username}</Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body1" sx={{ mb: 1 }}>Expertise: {speakerProfile.expertise}</Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>Hourly Rate: ${speakerProfile.hourly_rate}</Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>Location: {speakerProfile.location}</Typography>
                  </>
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => setDialogOpen(true)}
                    sx={{ textTransform: 'none', padding: '12px', fontWeight: 'bold' }}
                  >
                    Create Speaker Profile
                  </Button>
                )}

                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
                  <DialogTitle>Create Speaker Profile</DialogTitle>
                  <DialogContent>
                    <TextField
                      label="Expertise"
                      type="text"
                      value={formData.expertise}
                      onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                      fullWidth
                      required
                      margin="normal"
                      variant="standard"
                    />
                    <TextField
                      label="Hourly Rate ($ per hour)"
                      type="number"
                      value={formData.hourly_rate}
                      onChange={(e) => setFormData({ ...formData, hourly_rate: Number(e.target.value) })}
                      fullWidth
                      required
                      margin="normal"
                      variant="standard"
                    />
                    <TextField
                      label="Location"
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      fullWidth
                      required
                      margin="normal"
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="secondary">
                      Cancel
                    </Button>
                    <Button onClick={createSpeakerProfile} variant="contained" color="primary">
                      Create Speaker Profile
                    </Button>
                  </DialogActions>
                </Dialog>
              </CardContent>
            </StyledCard>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default DashboardPage;
