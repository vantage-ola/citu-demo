import React, { useContext } from 'react';
import LoginForm from '../components/AuthForm/LoginForm';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/API';
import { AuthContext } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (username: string, password: string) => {
    try {
      const { access, refresh, user } = await api.login(username, password);

      // Save tokens in localStorage for persistence
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);

      // Update the AuthContext
      login(user, access);

      console.log('Login successful:', user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid username or password. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
