import React, { useState, useEffect, useContext } from 'react';
import { api } from '../../services/API';
import { MockPayment } from '../../utils/Types';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  CircularProgress,
  Paper,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { AuthContext } from '../../context/AuthContext';

const PaymentPage: React.FC = () => {
  const [payments, setPayments] = useState<MockPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await api.getPayments();
        if (user) {
          const userPayments = data.filter(payment => payment.payer === user.id);
          setPayments(userPayments);
        }
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, [user]);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 1 }}>
          Loading payment data...
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
        Payments
      </Typography>
      {payments.length === 0 ? (
        <Paper
          elevation={2}
          sx={{
            p: 3,
            textAlign: 'center',
            borderRadius: 2,
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}
          >
            <AttachMoneyIcon
              sx={{
                fontSize: 48,
                color: 'primary.main',
                opacity: 0.8
              }}
            />
            <Typography variant="h6" color="text.primary">
              No Payments Found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
              Your payment history will appear here after you make your first payment for a speaking engagement.
              Book a speaker and complete the payment process to see your transaction history.
            </Typography>
          </Box>
        </Paper>
      ) : (
        <Box display="flex" flexDirection="column" gap="1rem">
          {payments.map((payment) => (
            <Card
              key={payment.id}
              elevation={3}
              sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <AttachMoneyIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Transaction ID: {payment.transaction_id}
                  </Typography>
                </Box>
                <Typography variant="body1" color="textSecondary">
                  Amount: <strong>${payment.amount}</strong>
                </Typography>
                <Box mt={1}>
                  <Chip
                    label={payment.status}
                    color={
                      payment.status === 'COMPLETED'
                        ? 'success'
                        : payment.status === 'PENDING'
                        ? 'warning'
                        : payment.status === 'FAILED'
                        ? 'error'
                        : 'default'
                    }
                    size="small"
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default PaymentPage;