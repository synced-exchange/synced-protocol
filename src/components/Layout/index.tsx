import React from 'react'
import styled from 'styled-components'

import NavBar from './NavBar'
import Warning, { DISPLAY_WARNING } from './Warning'
import Footer from './Footer'

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-flow: column nowrap;
`

const Content = styled.div<{
  warning: boolean
}>`
  display: block;
  position: relative;
  height: calc(100vh - 4rem - ${({ warning }) => (warning ? '80px' : '0px')});
  background: ${({ theme }) => theme.black};
  overflow: scroll;
`

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <NavBar />
      <Warning />
      <Content warning={DISPLAY_WARNING}>
        {children}
        <Footer />
      </Content>
    </Wrapper>
  )
}
