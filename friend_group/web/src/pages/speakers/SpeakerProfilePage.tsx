import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { api } from '../../services/API';
import { SpeakerProfile } from '../../utils/Types';
import { Container, Typography, Card, CardContent, CircularProgress, Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SpeakerProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [speaker, setSpeaker] = useState<SpeakerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpeaker = async () => {
      try {
        const data = await api.getSpeaker(Number(id));
        setSpeaker(data);
        setError(null);
      } catch {
        setError('Failed to load speaker profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSpeaker();
  }, [id]);

  if (loading)
    return (
      <Container sx={{ textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 1 }}>
          Loading speaker profile...
        </Typography>
      </Container>
    );

  if (error)
    return (
      <Container sx={{ textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );

  return (
    <Container maxWidth="sm" sx={{ p: 2 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/speakers')}
        variant="text"
        color="primary"
        sx={{ mb: 2 }}
      ></Button>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
        {speaker?.user.username}'s Profile
      </Typography>
      <Card elevation={3} sx={{ p: 2, borderRadius: 2, boxShadow: 1 }}>
        <CardContent>
          <Box mb={2}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Expertise:</Typography>
            <Typography color="textSecondary">{speaker?.expertise}</Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Location:</Typography>
            <Typography color="textSecondary">{speaker?.location}</Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Hourly Rate:</Typography>
            <Typography color="textSecondary">${speaker?.hourly_rate}</Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Available Online:</Typography>
            <Typography color="textSecondary">
              {speaker?.available_online ? 'Yes' : 'No'}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SpeakerProfilePage;
