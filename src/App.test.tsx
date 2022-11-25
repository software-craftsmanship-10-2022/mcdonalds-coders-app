import {act, render, screen} from '@testing-library/react';
import App from './App';

test('renders the logo in the header', async () => {
  await act(async () => {
    render(<App />);
  });
  const logo = screen.getByAltText(/logo/i);
  expect(logo).toBeInTheDocument();
});
