import { Stack, StackProps } from '@chakra-ui/react';
import { Footer } from './footer';
import Header from '../header';
import LeftMenu from '../left-menu';
import { SubFooterLanding } from '../landing/subfooter-landing';
import { useRouter } from 'next/router';
import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #000;
  flex: 1;
`

export const Layout = ({ children, ...props }: StackProps) => {
  const router = useRouter();
  return (
    <div style={{height: '100vh'}}>
      <Header />
      <Wrapper>
        <LeftMenu />
        {children}
      </Wrapper>
      <Footer />
    </div>
  );
};
