import React from 'react';
import { render } from '@testing-library/react';
import MainLayout from '../MainLayout';

jest.mock('src/components/Header', () => 'Mock-Header');
jest.mock('src/route/RouteView', () => 'Mock-RouterView');

describe('Mainlayout component', () => {
  it('Render Mainlayout', async () => {
    const wrapper = render(<MainLayout />);

    expect(wrapper.container).toMatchSnapshot();
  });
});
