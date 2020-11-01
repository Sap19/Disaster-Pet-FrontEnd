import React from 'react';
import { render } from './node_modules/@testing-library/react';
import App from '../../Pages/App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
