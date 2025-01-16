import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

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
    <Box display="flex" flexDirection="column" alignItems="center" px={3}>
      <Typography variant="h4" gutterBottom>
        Log In
      </Typography>
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
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        sx={{ mt: 2 }}
      >
        Log In
      </Button>
    </Box>
  );
};

export default LoginForm;
