import React from 'react';
import { render } from '@testing-library/react';
import IonicApp from './App';

test('renders without crashing', () => {
  const { baseElement } = render(<IonicApp />);
  expect(baseElement).toBeDefined();
});
