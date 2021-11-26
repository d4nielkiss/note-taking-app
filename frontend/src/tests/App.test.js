import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../components/App';

beforeEach(() => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});

afterEach(() => {
  cleanup();
});

describe('given a rendered home page', () => {
  test('should be a title on the page', () => {
    const title = screen.getByText(/note taking app/i);
    expect(title).toBeInTheDocument();
  });

  test('should be a login text', () => {
    const login = screen.getByText(/click here to log in/i);
    expect(login).toBeInTheDocument();
  });

  test('should be a sign up text', () => {
    const services = screen.getByText(/sign up here/i);
    expect(services).toBeInTheDocument();
  });
});

describe('given a login link', () => {
  test('should navigate to login page', () => {
    fireEvent.click(screen.getByText(/click here to log in/i));
    expect(screen.getByText('Logging in to your account')).toBeInTheDocument();
  });

  test('should have an email label', () => {
    const emailLabel = screen.getByLabelText('Email');
    expect(emailLabel).toBeInTheDocument();
  });

  test('should have a password label', () => {
    const passwordLabel = screen.getByLabelText('Password*');
    expect(passwordLabel).toBeInTheDocument();
  });

  describe('given empty input fields for log in', () => {
    test('email field should respond with error message', () => {
      const emailField = document.querySelector('#email');
      fireEvent.focusIn(emailField);
      fireEvent.focusOut(emailField);
      const errorMessage = screen.getByText('Please fill the field above!');
      expect(errorMessage).toBeInTheDocument();
    });

    test('password field should respond with error message', () => {
      const passwordField = document.querySelector('#password');
      fireEvent.focusIn(passwordField);
      fireEvent.focusOut(passwordField);
      const errorMessage = screen.getByText('Please fill the field above!');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});

describe('given a registration link', () => {
  test('should navigate to registration page', () => {
    fireEvent.click(screen.getByText('Click here!'));
    expect(screen.getByText('Creating a new account')).toBeInTheDocument();
  });

  test('should have an email label', () => {
    const emailLabel = screen.getByLabelText('Email');
    expect(emailLabel).toBeInTheDocument();
  });

  test('should have a password label', () => {
    const passwordLabel = screen.getByLabelText('Password*');
    expect(passwordLabel).toBeInTheDocument();
  });

  test('should have info about passoword requirements', () => {
    const passwordReq = screen.getByText(
      '* Password must be at least 8 characters long'
    );
    expect(passwordReq).toBeInTheDocument();
  });
});
