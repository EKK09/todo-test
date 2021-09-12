import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useHistory } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}));
describe('NotFoundPage component', () => {
  it('Render NotFoundPage', async () => {
    const wrapper = render(<NotFoundPage />);

    expect(wrapper.container).toMatchSnapshot();
  });

  it('click Go home button', async () => {
    const mockReplace = jest.fn();
    (useHistory as jest.Mock).mockImplementation(() => ({ replace: mockReplace }));
    const { getByText } = render(<NotFoundPage />);
    const button = getByText('Go Home');
    fireEvent.click(button);

    expect(mockReplace).toBeCalledWith('/');
    expect(mockReplace).toBeCalledTimes(1);
  });
});
