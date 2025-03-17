import { render, screen } from '@testing-library/react';
import App from './App';

test('renders My Store header', () => {
  render(<App />);
  // Query by role "heading" with the accessible name "My Store"
  const headerElement = screen.getByRole('heading', { name: /My Store/i });
  expect(headerElement).toBeInTheDocument();
});
