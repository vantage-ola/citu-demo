import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/API';
import { Event } from '../../utils/Types';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Button,
  TextField,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AuthContext } from '../../context/AuthContext';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventData = await api.getEvent(Number(id));
        setEvent(eventData);
        const registrations = await api.getEventRegistrations();
        setIsRegistered(registrations.some((registration) => registration.event === Number(id) && Number(registration.user) === user?.id));
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [id, user]);

  const registerForEvent = async () => {
    try {
      if (user) {
        await api.registerForEvent(user.id, Number(id));
        setIsRegistered(true);
      } else {
        console.error('User is not logged in');
      }
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  const handlePayment = async () => {
    try {
      if (user) {
        const statusOptions = ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED']; // random status
        const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
        const paymentData = {
          event: Number(id),
          amount,
          recipient: Number(event?.created_by),
          payer: user.id,
          status: randomStatus,
        };
        const paymentResponse = await api.createPayment(paymentData);
        setPaymentStatus(paymentResponse.status);
        location.reload();
      } else {
        console.error('User is not logged in');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  if (isLoading) {
    return (
      <Container sx={{ mt: 'calc(var(--template-frame-height, 0px) + 28px)', textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 1 }}>
          Loading event details...
        </Typography>
      </Container>
    );
  }

  if (!event) {
    return (
      <Container sx={{ mt: 'calc(var(--template-frame-height, 0px) + 28px)', textAlign: 'center' }}>
        <Typography variant="h6">Event not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 'calc(var(--template-frame-height, 0px) + 28px)', p: 2 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/events')}
        variant="text"
        color="primary"
        sx={{ mb: 2 }}
      >
        Back to Events
      </Button>

      <Card elevation={2} sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {event.title}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            {event.description}
          </Typography>
          <Box display="flex" gap={4}>
            <Box>
              <Typography color="textSecondary">Date</Typography>
              <Typography>{new Date(event.date).toLocaleDateString()}</Typography>
            </Box>
            <Box>
              <Typography color="textSecondary">Time</Typography>
              <Typography>{event.start_time} - {event.end_time}</Typography>
            </Box>
            <Box>
              <Typography color="textSecondary">Location</Typography>
              <Typography>{event.location}</Typography>
            </Box>
          </Box>
          {!isRegistered ? (
            <Button
              onClick={registerForEvent}
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Register for Event
            </Button>
          ) : (
            <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
              You are registered for this event
            </Typography>
          )}
        </CardContent>
      </Card>

      <Card elevation={2} sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Donate to this Event
          </Typography>
          <TextField
            label="Amount"
            type="number"
            variant="standard"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            onClick={handlePayment}
            variant="contained"
            color="primary"
          >
            Donate
          </Button>
          {paymentStatus && (
            <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
              Payment Status: {paymentStatus}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default EventDetailPage;