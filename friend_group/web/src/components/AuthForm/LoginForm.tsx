import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  FormControl,
  FormLabel,
} from '@mui/material';
import { Card } from '../Card/Card';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from submitting traditionally

    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    setError(''); // Clear any previous errors
    onSubmit(username, password);
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <TextField
            id="username"
            type="text"
            name="username"
            placeholder="john.doe"
            value={username}
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
            required
            margin="normal"
            autoFocus
            fullWidth
            variant="outlined"
            error={!!error}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            margin="normal"
            fullWidth
            variant="outlined"
            error={!!error}
          />
        </FormControl>

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Box>

      <Typography textAlign="center" style={{ marginTop: '1em'}}>
        Don't have an account?{' '}
        <Link href="/signup" underline="hover">
          Signup
        </Link>
      </Typography>
    </Card>
  );
};

export default LoginForm;