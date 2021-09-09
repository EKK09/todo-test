import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.div`
  max-width: 780px;
  margin: 0 auto;
`;

const MainLayout = (): React.ReactElement => (
  <Wrapper>
    <Title>TodoList</Title>
  </Wrapper>
);

export default MainLayout;
