import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

test('renders footer', () => {
  render(<Footer />);
  const madeWithLove = screen.getByText(/Made with by Fluxy/i);
  expect(madeWithLove).toBeInTheDocument();
});
