import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import LangSelector from './LangSelector';

const Wrapper = styled.div`
  padding: 26px 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 2rem;
  text-align: center;
  color: palevioletred;
  line-height: 26px;
`;

const LangSelectorWrapper = styled.div`
  position: absolute;
  right: 0;
`;

const Header = (): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Title>{t('global.appName')}</Title>
      <LangSelectorWrapper>
        <LangSelector />
      </LangSelectorWrapper>
    </Wrapper>
  );
};

export default Header;
