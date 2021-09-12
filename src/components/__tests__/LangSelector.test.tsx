import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n, { Lang } from 'src/i18n';
import LangSelector from '../LangSelector';

describe('LangSelector component', () => {
  it('Render LangSelector', async () => {
    i18n.changeLanguage(Lang.EN_US);
    const wrapper = render(
      <I18nextProvider i18n={i18n}>
        <LangSelector />
      </I18nextProvider>,
    );

    expect(wrapper.container).toMatchSnapshot();
  });

  it('selector onchange should call changeLanguage ', async () => {
    const mockChangeLanguage = jest.fn();
    i18n.changeLanguage = mockChangeLanguage;
    const { getByTestId } = render(
      <I18nextProvider i18n={i18n}>
        <LangSelector />
      </I18nextProvider>,
    );
    const selectNode = getByTestId('lang-selector');
    fireEvent.change(selectNode, { target: { value: Lang.ZH_TW } });

    expect(mockChangeLanguage).toBeCalledWith(Lang.ZH_TW);
  });
});
