import React from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n, { Lang } from 'src/i18n';
import Header from '../Header';

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
});
