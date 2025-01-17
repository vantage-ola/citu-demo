import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

interface SignupFormProps {
  onSubmit: (username: string, email: string, password: string, is_speaker: boolean) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [is_speaker, setSpeaker] = useState(false)
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    if (!username || !email ||  !password) {
      setError('Username and password are required.');
      return;
    }
    event.preventDefault();
    onSubmit(username, email, password, is_speaker);
  };

  const handleSpeakerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeaker(event.target.checked);
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
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <FormControlLabel
          control={
            <Checkbox
              checked={is_speaker}
              onChange={handleSpeakerChange}
            />
          }
          label="Speaker"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}

        >
          Sign Up
        </Button>
        <Typography textAlign="center" style={{ marginTop: '1em'}}>
        Already have an account?{' '}
        <Link href="/" underline="hover">
          Login
        </Link>
      </Typography>
    </Box>
  );
};

export default SignupForm;
