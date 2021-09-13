import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { ROUTE_PATH } from 'src/route/routes';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: DarkTurquoise;
`;
const Title = styled.div`
  font-size: 25vh;
`;
const Description = styled.h2`
  opacity: 0.4;
`;
const Button = styled.button`
  color: white;
  background-color: DarkTurquoise;
  font-size: larger;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 5px;
`;

const NotFoundPage = (): React.ReactElement => {
  const history = useHistory();

  const goToHomePage = () => {
    history.replace(ROUTE_PATH.HOME);
  };

  return (
    <Wrapper>
      <div>
        <Title>404</Title>
        <Description>Oops, Nothing here...</Description>
        <Button type="submit" onClick={goToHomePage}>Go Home</Button>
      </div>
    </Wrapper>
  );
};

export default NotFoundPage;
