import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../services/API";
import { SpeakerAvailability, SpeakerProfile } from "../../utils/Types";
import { Box, Typography, Button, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Switch, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)`
  box-shadow: 3;
  border-radius: 2;
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const SpeakerAvailabilityPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [availability, setAvailability] = useState<SpeakerAvailability | null>(null);
  const [speakerProfile, setSpeakerProfile] = useState<SpeakerProfile | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    start_time: '',
    end_time: '',
    is_available: true,
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

  const fetchAvailability = async () => {
    if (speakerProfile) {
      try {
        const availabilities = await api.GetSpeakerAvailability();
        const userAvailability = availabilities.data.find(avail => avail.speaker === speakerProfile.id);
        setAvailability(userAvailability || null);
        if (userAvailability) {
          setFormData({
            date: userAvailability.date,
            start_time: userAvailability.start_time,
            end_time: userAvailability.end_time,
            is_available: userAvailability.is_available,
          });
        }
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    }
  };

  useEffect(() => {
    fetchSpeakerProfile();
  }, [user]);

  useEffect(() => {
    fetchAvailability();
  }, [speakerProfile]);

  const createAvailability = async () => {
    if (!formData.date || !formData.start_time || !formData.end_time) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await api.CreateSpeakerAvailabilty(
        formData.date,
        formData.start_time,
        formData.end_time,
        formData.is_available,
        speakerProfile!.id
      );
      setDialogOpen(false);
      fetchAvailability();
    } catch (error) {
      console.error('Error creating availability:', error);
      alert('Availability creation failed. Please try again.');
    }
  };

  const editAvailability = async () => {
    if (!formData.date || !formData.start_time || !formData.end_time) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await api.EditSpeakerAvailability(
        availability!.id,
        formData.date,
        formData.start_time,
        formData.end_time,
        formData.is_available,
        speakerProfile!.id
      );
      setDialogOpen(false);
      fetchAvailability();
    } catch (error) {
      console.error('Error updating availability:', error);
      alert('Availability update failed. Please try again.');
    }
  };

  const handleToggleAvailability = () => {
    setFormData(prev => ({
      ...prev,
      is_available: !prev.is_available
    }));
  };

  return (
    <Box sx={{ p: 4, maxWidth: '1200px', margin: '0 auto', bgcolor: 'background.default', pt: 'em' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 0, color: 'primary.main' }}>
        Manage Your Availability
      </Typography>
      <Typography variant="subtitle2" color="textSecondary" sx={{ marginBottom: 4 }}>
        Set and update your availability for speaking engagements.
      </Typography>

      {speakerProfile ? (
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Availability Profile</Typography>
                {availability ? (
                  <>
                    <Typography variant="body1" sx={{ mb: 1 }}>Date: {availability.date}</Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>Start Time: {availability.start_time}</Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>End Time: {availability.end_time}</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      Status: {availability.is_available ? 'Available' : 'Not Available'}
                    </Typography>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => setDialogOpen(true)}
                      sx={{ textTransform: 'none', padding: '12px', fontWeight: 'bold' }}
                    >
                      Edit Availability
                    </Button>
                  </>
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => setDialogOpen(true)}
                    sx={{ textTransform: 'none', padding: '12px', fontWeight: 'bold' }}
                  >
                    Create Availability
                  </Button>
                )}

                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
                  <DialogTitle>{availability ? 'Edit Availability' : 'Create Availability'}</DialogTitle>
                  <DialogContent>
                    <TextField
                      label="Date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      fullWidth
                      required
                      margin="normal"
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="Start Time"
                      type="time"
                      value={formData.start_time}
                      onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                      fullWidth
                      required
                      margin="normal"
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="End Time"
                      type="time"
                      value={formData.end_time}
                      onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                      fullWidth
                      required
                      margin="normal"
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.is_available}
                          onChange={handleToggleAvailability}
                          color="primary"
                        />
                      }
                      label={formData.is_available ? "Available" : "Not Available"}
                      sx={{ mt: 2, mb: 1 }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="secondary">
                      Cancel
                    </Button>
                    <Button onClick={availability ? editAvailability : createAvailability} variant="contained" color="primary">
                      {availability ? 'Update Availability' : 'Create Availability'}
                    </Button>
                  </DialogActions>
                </Dialog>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h6" color="textSecondary" align="center">
          Please create a speaker profile first.
        </Typography>
      )}
    </Box>
  );
};

export default SpeakerAvailabilityPage;