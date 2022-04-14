import React from 'react'
import styled from 'styled-components'

import { StakeToken, StakeLP } from 'components/App/Sync'

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 3rem;
  overflow: visible;
  margin: 75px auto;
  width: clamp(250px, 75%, 1200px);

  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin-top: 30px;
  `}
`

export default function Sync() {
  return (
    <Container>
      <StakeToken />
      <StakeLP />
    </Container>
  )
}
