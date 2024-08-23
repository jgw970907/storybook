import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import secureStorage from 'react-secure-storage';
import App from './App';

describe('App component', () => {
  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('clicking button changes text', () => {
    render(<App />);
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    expect(screen.getByText('Button clicked!')).toBeInTheDocument();
  });

  test('renders the header', () => {
    render(<App />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders the logo', () => {
    render(<App />);
    const logoElement = screen.getByAltText('logo');
    expect(logoElement).toBeInTheDocument();
  });

  test('logo spins on click', async () => {
    render(<App />);
    const logoElement = screen.getByAltText('logo');
    expect(logoElement).not.toHaveClass('App-logo-spin');

    await userEvent.click(logoElement);
    expect(logoElement).toHaveClass('App-logo-spin');
  });

  test('link opens in new tab', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders navigation menu', () => {
    render(<App />);
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
  });

  test('renders footer', () => {
    render(<App />);
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  test('changes theme on theme toggle button click', async () => {
    render(<App />);
    const themeToggleButton = screen.getByRole('button', { name: /toggle theme/i });
    const initialTheme = document.body.className;

    await userEvent.click(themeToggleButton);

    expect(document.body.className).not.toBe(initialTheme);
  });

  test('shows loading state when fetching data', async () => {
    render(<App />);
    const loadingElement = screen.getByText(/loading/i);
    expect(loadingElement).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });
  test('secureStorage is used correctly', () => {
    secureStorage.setItem('key', 'value');
    expect(secureStorage.setItem).toHaveBeenCalledWith('key', 'value');

    secureStorage.getItem('key');
    expect(secureStorage.getItem).toHaveBeenCalledWith('key');
  });
  test('displays error message on API failure', async () => {
    // Mock API 호출 실패
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('API error'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/error occurred/i)).toBeInTheDocument();
    });
    // Mock 복원
    jest.restoreAllMocks();
  });
});
