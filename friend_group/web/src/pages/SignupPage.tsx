import React from 'react';
import SignupForm from '../components/AuthForm/SignupForm';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/API';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignup = async (username: string, email: string, password: string) => {
    try {
      await api.signup(username, email, password);
      alert('Signup successful! Please log in.');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <SignupForm onSubmit={handleSignup} />
    </div>
  );
};

export default SignupPage;
