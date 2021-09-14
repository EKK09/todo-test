import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n, { Lang } from 'src/i18n';
import useUserStore from 'src/store/user';
import Header from '../Header';
import '@testing-library/jest-dom';

jest.mock('src/components/LangSelector', () => 'Mock-LangSelector');

describe('Header component', () => {
  it('Render Header english version', async () => {
    i18n.changeLanguage(Lang.EN_US);
    const wrapper = render(
      <I18nextProvider i18n={i18n}>
        <Header />
      </I18nextProvider>,
    );

    expect(wrapper.container).toMatchSnapshot();
  });

  it('Render Header chinese version', async () => {
    i18n.changeLanguage(Lang.ZH_TW);
    const wrapper = render(
      <I18nextProvider i18n={i18n}>
        <Header />
      </I18nextProvider>,
    );

    expect(wrapper.container).toMatchSnapshot();
  });

  it('show logout button if user id has been setted', async () => {
    i18n.changeLanguage(Lang.EN_US);
    useUserStore.setState({ id: 123 });
    render(
      <I18nextProvider i18n={i18n}>
        <Header />
      </I18nextProvider>,
    );
    // TODO: get the button by more Precisely text
    const logoutButton = screen.queryByText('Logout');

    expect(logoutButton).toBeInTheDocument();
  });

  it('not show logout button if user id has not been setted', async () => {
    useUserStore.setState({ id: null });
    i18n.changeLanguage(Lang.EN_US);
    render(
      <I18nextProvider i18n={i18n}>
        <Header />
      </I18nextProvider>,
    );
    // TODO: get the button by more Precisely text
    const logoutButton = screen.queryByText('Logout');

    expect(logoutButton).not.toBeInTheDocument();
  });

  it('click logout button should reset user id', async () => {
    useUserStore.setState({ id: 123 });
    i18n.changeLanguage(Lang.EN_US);
    render(
      <I18nextProvider i18n={i18n}>
        <Header />
      </I18nextProvider>,
    );
    // TODO: get the button by more Precisely text
    const logoutButton = screen.queryByText('Logout');
    fireEvent.click(logoutButton);
    const userId = useUserStore.getState().id;

    expect(userId).toBeNull();
  });
});
