import React, { ChangeEvent } from 'react';
import { LANG_OPTION } from 'src/i18n';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  margin: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Select = styled.select`
    font-size: 1em;
`;

const LangSelector = (): React.ReactElement => {
  const { i18n } = useTranslation();
  const currentlang = i18n.language;
  const handleLangSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };
  const langOptions = Object.entries(LANG_OPTION).map(([value, label]) => (
    <option key={value} value={value}>{label}</option>
  ));
  return (
    <Wrapper>
      <Select value={currentlang} onChange={handleLangSelect} data-testid="lang-selector">
        {langOptions}
      </Select>
    </Wrapper>
  );
};

export default LangSelector;
