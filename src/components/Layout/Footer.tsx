import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

import DeusLogo from '/public/static/images/tokens/deus.svg'
import { ExternalLink } from 'components/Link'

const DeusBanner = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: ${({ theme }) => theme.text2};
  gap: 5px;
  margin-top: 2rem;
  opacity: 0.5;
`

export default function Footer() {
  return (
    <DeusBanner>
      <Image src={DeusLogo} alt="DEUS Logo" width="15px" height="15px" />
      <ExternalLink href="https://deus.finance">Powered by DEUS Finance</ExternalLink>
    </DeusBanner>
  )
}
