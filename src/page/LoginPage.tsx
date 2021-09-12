import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useUserStore from 'src/store/user';
import styled from 'styled-components';
import { Location } from 'history';
import { useTranslation } from 'react-i18next';

type LocationState = {
  from: Location;
};

const Wrapper = styled.div`
  max-width: 300px;
  margin: 60px auto;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
`;

const InputLabel = styled.span`
  font-weight: bolder;
  margin-right: 10px;
  width: 80px;
  display: inline-block;
`;
const Input = styled.input`
  flex: 1;
`;

const Button = styled.button`
  color: black;
  font-weight: bolder;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  float: right;
`;

const LoginPage = (): React.ReactElement => {
  const setUserId = useUserStore((state) => state.setId);
  const history = useHistory();
  const location: Location<LocationState> = useLocation();
  const { t } = useTranslation();

  const handleLogin = () => {
    // TODO: implement login api
    setUserId(1234);
    const { from } = location.state;
    const nextPath = from.pathname || '/';
    history.push(nextPath);
  };

  return (
    <Wrapper>
      <InputWrapper>
        <InputLabel>
          {t('loginPage.account')}
        </InputLabel>
        <Input value="IamDavid" readOnly />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>
          {t('loginPage.password')}
        </InputLabel>
        <Input value="123456" type="password" readOnly />
      </InputWrapper>
      <Button onClick={handleLogin}>
        {t('loginPage.login')}
      </Button>
    </Wrapper>
  );
};

export default LoginPage;
