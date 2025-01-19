import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { describe, it, expect } from 'vitest';
import App from './App';
import '@testing-library/jest-dom';

// no time to write proper tests because of time constraints
describe('App', () => {
  it('renders the login page by default', () => {
    render(<App />);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('renders the dashboard page when navigating to /dashboard', () => {
    window.history.pushState({}, 'Dashboard Page', '/dashboard');
    render(<App />);
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});