import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import useUserStore from 'src/store/user';
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

const OperationWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  right: 0;
`;

const Button = styled.button`
  color: black;
  font-weight: bolder;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  float: right;
`;

const Header = (): React.ReactElement => {
  const { t } = useTranslation();
  const { id, setId } = useUserStore();
  const handleLogout = (): void => {
    setId(null);
  };
  const isShowLogoutBtn: boolean = id !== null;
  return (
    <Wrapper>
      <Title>{t('global.appName')}</Title>
      <OperationWrapper>
        <LangSelector />
        {isShowLogoutBtn ? <Button type="button" onClick={handleLogout}>{t('global.logout')}</Button> : null}
      </OperationWrapper>
    </Wrapper>
  );
};

export default Header;
