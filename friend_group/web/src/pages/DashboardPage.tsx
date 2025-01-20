import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  Divider,
  Paper
} from '@mui/material';
import { Link } from 'react-router-dom';
import { api } from '../services/API';
import { styled } from '@mui/material/styles';
import { SpeakerProfile } from '../utils/Types';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import PaidIcon from '@mui/icons-material/Paid';

const StyledCard = styled(Card)`
  box-shadow: 3;
  border-radius: 2;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.paper};
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }
`;

const IconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const DashboardPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [speakerProfile, setSpeakerProfile] = useState<SpeakerProfile | null>(null);
  const [formData, setFormData] = useState({
    expertise: '',
    hourly_rate: 0,
    location: '',
  });

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

  useEffect(() => {
    fetchSpeakerProfile();
  }, [user]);

  if (!user) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh'
      }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
          <Typography variant="h5" color="textSecondary">
            Please log in to access your dashboard.
          </Typography>
        </Paper>
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
    <Box sx={{ p: 4, maxWidth: '1200px', margin: '0 auto', bgcolor: 'background.default' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 0.5, color: 'primary.main' }}>
        {getTimeOfDay()}, {user.username}!
      </Typography>
      <Typography variant="subtitle2" color="textSecondary" sx={{ marginBottom: 4 }}>
        Welcome to your dashboard • {user.is_speaker ? 'Guest Speaker' : 'Group Member'}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <IconWrapper>
                <GroupsIcon color="primary" sx={{ fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Manage Groups
                </Typography>
              </IconWrapper>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
                Create, join, or manage your groups and connect with other members.
              </Typography>
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
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <IconWrapper>
                <EventIcon color="secondary" sx={{ fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Organize Events
                </Typography>
              </IconWrapper>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
                Schedule and manage events for your groups or browse upcoming sessions.
              </Typography>
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
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <IconWrapper>
                <RecordVoiceOverIcon color="primary" sx={{ fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Browse Speakers
                </Typography>
              </IconWrapper>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
                Discover and connect with expert speakers for your events.
              </Typography>
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

        {user.is_speaker && (
          <Grid item xs={12} sm={6} md={4}>
            <StyledCard>
              <CardContent>
                <IconWrapper>
                  <RecordVoiceOverIcon color="primary" sx={{ fontSize: 28 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Speaker Profile
                  </Typography>
                </IconWrapper>
                {speakerProfile ? (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar
                        sx={{
                          bgcolor: 'primary.main',
                          width: 64,
                          height: 64,
                          fontSize: '1.5rem'
                        }}
                      >
                        {speakerProfile.user.username.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {speakerProfile.user.username}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Professional Speaker
                        </Typography>
                      </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <WorkIcon sx={{ color: 'primary.main', mr: 1 }} />
                      <Typography variant="body1">
                        {speakerProfile.expertise}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <PaidIcon sx={{ color: 'primary.main', mr: 1 }} />
                      <Typography variant="body1">
                        ${speakerProfile.hourly_rate}/hour
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOnIcon sx={{ color: 'primary.main', mr: 1 }} />
                      <Typography variant="body1">
                        {speakerProfile.location}
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Create your speaker profile to start accepting speaking engagements.
                    </Typography>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => setDialogOpen(true)}
                      sx={{ textTransform: 'none', padding: '12px', fontWeight: 'bold' }}
                    >
                      Create Speaker Profile
                    </Button>
                  </>
                )}
              </CardContent>
            </StyledCard>
          </Grid>
        )}
      </Grid>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 'bold' }}>Create Speaker Profile</DialogTitle>
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
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 1){
              setFormData({ ...formData, hourly_rate: value});
            }
          }}
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
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={createSpeakerProfile} variant="contained" color="primary">
            Create Profile
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardPage;