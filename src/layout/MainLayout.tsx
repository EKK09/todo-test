import React, { Suspense } from 'react';
import Header from 'src/components/Header';
import RouteView from 'src/route/RouteView';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 780px;
  margin: 0 auto;
`;

const MainLayout = (): React.ReactElement => (
  <Wrapper>
    <Header />
    <Suspense fallback={<div>loading ...</div>}>
      <RouteView />
    </Suspense>
  </Wrapper>
);

export default MainLayout;
