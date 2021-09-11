import React, { Suspense } from 'react';
import RouteView from 'src/route/RouteView';
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
    <Suspense fallback={<div>loading ...</div>}>
      <RouteView />
    </Suspense>
  </Wrapper>
);

export default MainLayout;
