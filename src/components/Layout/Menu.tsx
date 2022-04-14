import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Link from 'next/link'
import { Z_INDEX } from 'theme'

import useOnOutsideClick from 'hooks/useOnOutsideClick'

import {
  NavToggle,
  IconWrapper,
  Info as InfoIcon,
  Telegram as TelegramIcon,
  Twitter as TwitterIcon,
  Github as GithubIcon,
} from 'components/Icons'
import { Card } from 'components/Card'

import { NavButton } from 'components/Button'
import { ExternalLink } from 'components/Link'
import { Layout, Zap } from 'react-feather'

const Container = styled.div`
  overflow: hidden;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
`

const InlineModal = styled(Card)<{
  isOpen: boolean
}>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  position: absolute;
  width: 220px;
  transform: translateX(-220px) translateY(15px);
  z-index: ${Z_INDEX.modal};
  gap: 10px;
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.border2};
  border-radius: 10px;
`

const Row = styled.div<{
  active?: boolean
}>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  color: ${({ theme }) => theme.text4};
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.text1};
    background: ${({ theme }) => theme.bg1};

    #icon {
      stroke: ${({ theme }) => theme.text1};
    }
  }

  #icon {
    stroke: ${({ theme }) => theme.text4};
  }

  ${({ active, theme }) =>
    active &&
    `
    color: ${theme.text1};
    pointer-events: none;

    #icon {
      stroke: ${theme.text1};
    }
  `};
`

export default function Menu() {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const toggle = () => setIsOpen((prev) => !prev)
  useOnOutsideClick(ref, () => setIsOpen(false))

  return (
    <Container ref={ref}>
      <NavButton onClick={() => toggle()}>
        <NavToggle />
      </NavButton>
      <div>
        <InlineModal isOpen={isOpen}>
          <Link href={'/frontends'} passHref>
            <Row onClick={() => toggle()} active={router.route === '/frontends'}>
              <div>Frontends</div>
              <IconWrapper>
                <Layout id="icon" size={15} />
              </IconWrapper>
            </Row>
          </Link>
          <Link href={'/sync'} passHref>
            <Row active={router.route === '/sync'}>
              <div>Sync</div>
              <IconWrapper>
                <Zap id="icon" size={15} />
              </IconWrapper>
            </Row>
          </Link>
          {/* {!isDedicatedTheme && (
            <Row onClick={() => toggleDarkMode()}>
              <div>{darkMode ? 'Light Theme' : 'Dark Theme'}</div>
              <ThemeToggle />
            </Row>
          )} */}
          <ExternalLink href="https://docs.deus.finance/synchronizer/overview">
            <Row onClick={() => toggle()}>
              <div>Docs</div>
              <IconWrapper>
                <InfoIcon id="icon" size={15} />
              </IconWrapper>
            </Row>
          </ExternalLink>
          <ExternalLink href="https://twitter.com/syncexchange">
            <Row onClick={() => toggle()}>
              <div>Twitter</div>
              <IconWrapper>
                <TwitterIcon id="icon" size={15} />
              </IconWrapper>
            </Row>
          </ExternalLink>
          <ExternalLink href="https://t.me/syncedexchange">
            <Row onClick={() => toggle()}>
              <div>Community</div>
              <IconWrapper>
                <TelegramIcon id="icon" size={15} />
              </IconWrapper>
            </Row>
          </ExternalLink>
          <ExternalLink href="https://github.com/synced-exchange">
            <Row onClick={() => toggle()}>
              <div>Github</div>
              <IconWrapper>
                <GithubIcon id="icon" size={15} />
              </IconWrapper>
            </Row>
          </ExternalLink>
        </InlineModal>
      </div>
    </Container>
  )
}
