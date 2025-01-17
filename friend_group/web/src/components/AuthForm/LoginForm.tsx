import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
} from '@mui/material';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }
    setError('');
    onSubmit(username, password);
  };

  return (
    <Box>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <TextField
        label="Username"
        type="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        sx={{ mt: 2 }}
      >
        Login
      </Button>
        <Typography textAlign="center" style={{ marginTop: '1em'}}>
          Don't have an account?{' '}
          <Link href="/signup" underline="hover">
            Signup
          </Link>
        </Typography>
    </Box>
  );
};

export default LoginForm;
