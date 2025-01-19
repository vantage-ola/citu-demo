import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/API';
import { SpeakerProfile } from '../../utils/Types';
import {
  Container,
  TextField,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  InputAdornment,
  Chip,
  Paper,
  IconButton,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SpeakerDirectoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [speakers, setSpeakers] = useState<SpeakerProfile[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchSpeakers = async () => {
      const data = await api.getSpeakers();
      setSpeakers(data);
    };
    fetchSpeakers();
  }, []);

  const filteredSpeakers = speakers.filter((speaker) =>
    speaker.user.username.toLowerCase().includes(search.toLowerCase()) ||
    speaker.expertise.toLowerCase().includes(search.toLowerCase()) ||
    speaker.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleSpeakerClick = (id: number) => {
    navigate(`/speakers/${id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/dashboard')}
        variant="text"
        color="primary"
        sx={{ mb: 2 }}
      ></Button>
      <Paper elevation={0} sx={{ p: 4, backgroundColor: '#f5f5f5', mb: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
          Speaker Directory
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Find and connect with expert speakers across various domains
        </Typography>
        <TextField
          label="Search by name, expertise, or location"
          variant="standard"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ backgroundColor: 'white' }}
        />
      </Paper>

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(320px, 1fr))"
        gap={3}
      >
        {filteredSpeakers.map((speaker) => (
          <Card
            key={speaker.id}
            sx={{
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              },
            }}
            onClick={() => handleSpeakerClick(speaker.id)}
          >
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  sx={{ width: 56, height: 56, mr: 2, bgcolor: 'primary.main' }}
                >
                  <PersonIcon />
                </Avatar>
                <Box flex={1}>
                  <Typography variant="h6" fontWeight="bold">
                    {speaker.user.username}
                  </Typography>
                  <Chip
                    label={speaker.expertise}
                    size="small"
                    color="primary"
                    sx={{ mt: 0.5 }}
                  />
                </Box>
                <IconButton size="small">
                  <ArrowForwardIcon />
                </IconButton>
              </Box>

              <Box display="flex" flexDirection="column" gap={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <LocationOnIcon color="action" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    {speaker.location}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <MonetizationOnIcon color="action" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    ${speaker.hourly_rate}/hour
                  </Typography>
                </Box>

                {speaker.available_online && (
                  <Box display="flex" alignItems="center" gap={1}>
                    <VideocamIcon color="success" fontSize="small" />
                    <Typography variant="body2" color="success.main">
                      Available for online sessions
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {filteredSpeakers.length === 0 && (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="text.secondary">
            No speakers found matching your search criteria
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default SpeakerDirectoryPage;
