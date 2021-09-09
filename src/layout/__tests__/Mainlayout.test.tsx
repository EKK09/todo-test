import React from 'react';
import { render } from '@testing-library/react';
import MainLayout from '../MainLayout';

describe('Mainlayout component', () => {
  it('Render Mainlayout', () => {
    const wrapper = render(<MainLayout />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
