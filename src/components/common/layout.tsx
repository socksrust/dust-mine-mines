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
  background-color: #02011F;
  flex: 1;
  padding: 0px 100px;
  height: calc(100% - 150px);
`

export const Layout = ({ children, ...props }: StackProps) => {
  const router = useRouter();
  return (
    <div style={{height: '100vh'}} >
      <Header />
      <Wrapper>
        {children}
      </Wrapper>
      {/*<Footer />*/}
    </div>
  );
};
