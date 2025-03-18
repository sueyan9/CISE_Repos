import React from 'react';
import { createRoot } from 'react-dom/client';
// import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<App />);
  root.unmount();
});
  describe('Addition', () => {
    it('knows that 2 and 2 make 4', () => {
      expect(2 + 2).toBe(4);
    });
});
