import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoList from 'src/components/TodoList';
import { I18nextProvider } from 'react-i18next';
import i18n, { Lang } from 'src/i18n';
import { useHistory, useLocation } from 'react-router-dom';
import useUserStore from 'src/store/user';
import LoginPage from '../LoginPage';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
  useLocation: jest.fn(),
}));

describe('LoginPage component', () => {
  describe('Render LoginPage', () => {
    it('chinese', async () => {
      i18n.changeLanguage(Lang.ZH_TW);
      const wrapper = render(
        <I18nextProvider i18n={i18n}>
          <LoginPage />
        </I18nextProvider>,
      );

      expect(wrapper.container).toMatchSnapshot();
    });
    it('english', async () => {
      i18n.changeLanguage(Lang.EN_US);
      const wrapper = render(
        <I18nextProvider i18n={i18n}>
          <LoginPage />
        </I18nextProvider>,
      );

      expect(wrapper.container).toMatchSnapshot();
    });
  });

  it('click login should set user id and push to from path', async () => {
    const mockSetId = jest.fn();
    const mockPush = jest.fn();
    const fooPath = '/fooPath';
    useUserStore.setState({ setId: mockSetId });
    (useHistory as jest.Mock).mockImplementation(() => ({ push: mockPush }));
    (useLocation as jest.Mock).mockImplementation(
      () => ({ state: { from: { pathname: fooPath } } }),
    );
    const wrapper = render(<LoginPage />);
    fireEvent.click(wrapper.getByText('Login'));

    // user id  is hard-coded here
    expect(mockSetId).toBeCalledWith(1234);
    expect(mockPush).toBeCalledWith(fooPath);
  });
});
