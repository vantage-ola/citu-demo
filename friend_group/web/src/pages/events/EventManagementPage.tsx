import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/API';
import { Event } from '../../utils/Types';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { AuthContext } from '../../context/AuthContext';
import { Group} from '../../utils/Types';

const EventManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState<Event[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  // event management form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    group: '',
    date: '',
    start_time: '',
    end_time: '',
    location: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await api.getEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      const data = await api.getGroups();
      setGroups(data);
    };
    fetchGroups();
  }, []);

  const handleEventClick = (eventId: number) => {
    navigate(`/events/${eventId}`);
  };

  const createEvent = async () => {
    if (!formData.title || !formData.description) {
      alert('Title and Description are required.');
      return;
    }

    try {
      await api.createEvent(
        formData.title,
        formData.description,
        Number(formData.group),
        formData.date,
        formData.start_time,
        formData.end_time,
        formData.location,
        Number(user?.id)
      );
      setDialogOpen(false);
      location.reload();
      setFormData({
        title: '',
        description: '',
        group: '',
        date: '',
        start_time: '',
        end_time: '',
        location: ''
      });
    } catch {
      alert('Event creation failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 'calc(var(--template-frame-height, 0px) + 28px)', p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
          Manage Events
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setDialogOpen(true)}
          sx={{ textTransform: 'none' }}
        >
          Create Event
        </Button>
      </Box>

      <List>
        {events.map((event) => (
          <ListItem
            key={event.id}
            onClick={() => handleEventClick(event.id)}
            sx={{
              mb: 1,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 1,
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: 'action.hover',
                transform: 'translateX(4px)',
              },
            }}
          >
            <EventNoteIcon color="primary" sx={{ mr: 1 }} />
            <ListItemText
              primary={
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h6">{event.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {event.date}
                  </Typography>
                </Box>
              }
              secondary={
                <Box>
                  <Typography color="textSecondary">{event.description}</Typography>
                  <Typography variant="body2" color="primary" sx={{ mt: 0.5 }}>
                    {event.start_time} - {event.end_time}
                  </Typography>
                </Box>
              }
            />
            <ChevronRightIcon color="action" sx={{ ml: 1 }} />
          </ListItem>
        ))}
      </List>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create Event</DialogTitle>
        <DialogContent>
          <TextField
            name="title"
            label="Title"
            variant="standard"
            fullWidth
            value={formData.title}
            onChange={handleInputChange}
            margin="normal"
            required
          />

          <TextField
            name="description"
            label="Description"
            variant="standard"
            fullWidth
            value={formData.description}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={3}
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="group-label">Group</InputLabel>
            <Select
              labelId="group-label"
              name="group"
              value={formData.group}
              label="Group"
              onChange={(e) => handleInputChange(e)}
            >
              {groups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            name="date"
            label="Date"
            type="date"
            fullWidth
            variant="standard"
            value={formData.date}
            onChange={handleInputChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />

          <TextField
            name="start_time"
            label="Start Time"
            type="time"
            fullWidth
            variant="standard"
            value={formData.start_time}
            onChange={handleInputChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }} // 5 min intervals
            required
          />

          <TextField
            name="end_time"
            label="End Time"
            type="time"
            fullWidth
            variant="standard"
            value={formData.end_time}
            onChange={handleInputChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }} // 5 min intervals
            required
          />
          <TextField
            name="location"
            label="Location"
            variant="standard"
            fullWidth
            value={formData.location}
            onChange={handleInputChange}
            margin="normal"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={createEvent} color="primary" variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EventManagementPage;