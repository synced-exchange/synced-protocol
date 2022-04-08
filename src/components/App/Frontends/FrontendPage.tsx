import { WidgetModePrimaryLoginOption } from 'fortmatic'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { AlignCenter } from 'react-feather'
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1'
import { BaseButton } from 'components/Button'
import { Button } from 'rebass'

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

const PrimaryLabel = styled.div`
  text-align: center;
  font-size: 2.5rem;
  line-height: 3rem;
  color: ${({ theme }) => theme.text1};

  > span {
    color: ${({ theme }) => theme.themeColor};
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 1.25rem;
    line-height: 1.5rem;

    #linebreak {
        display: none;
    }
  `}
`

const SecondaryLabel = styled.div`
  text-align: center;
  font-size: 1.25rem;
  line-height: 1.5rem;
  color: ${({ theme }) => theme.text3};
  margin-top: 1rem;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 1rem;
    line-height: 1.25rem;

    #linebreak {
        display: none;
    }
  `}
`

const CardWrapper = styled.div`
    display: flex;
    flex-flow: row nowrap:
    gap: 2rem;
    justify-content: space-between;
    margin: 4rem 0;

    ${({ theme }) => theme.mediaWidth.upToMedium`
        flex-flow: column nowrap;
        gap: 1rem;
        margin: 2rem 0;
    `}
`

const WebsiteCard = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-basis: calc(50% - 1rem);
  padding: 2rem;
  border-radius: 30px;
  border: 2px solid ${({ theme }) => theme.border2};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `}
`

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem auto 0 auto;
    background: ${({ theme }) => theme.bg4};
    box-shadow: box-shadow: inset 0px 0px 2px  ${({ theme }) => theme.bg0};
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.border2};
    padding: 1rem;
    width: 200px;
    height: 200px;

    ${({ theme }) => theme.mediaWidth.upToMedium`
    margin: 0 auto;
  `}
`

const LogoLabel = styled.div`
  font-size: 1.25rem;
  line-height: 1.5rem;
  color: ${({ theme }) => theme.text1};
  margin-top: 0.75rem;
  text-align: center;
`

const SecondaryButton = styled(BaseButton)`
  margin: auto;
  border-radius: 1.25rem;
  padding: 0.25rem 1.25rem;
  color: ${({ theme }) => theme.text1};
  font-size: 1rem;
  line-height: 1.25rem;
  border: 1px solid ${({ theme }) => theme.themeColor};
  min-width: 140px;
  width: fit-content;
  margin-top: 1.25rem;

  &:hover {
    color: ${({ theme }) => theme.text2};
    border: 1px solid none;
    background: ${({ theme }) => theme.specialBG1};
    cursor: pointer;
  }
`

export default function FrontendPage() {
  return (
    <Wrapper>
      <PrimaryLabel>
        To use&nbsp;<span>SYNC</span>&nbsp;choose <br id="linebreak" />
        one of the Frontend Operators below.
      </PrimaryLabel>
      <SecondaryLabel>
        Multiple operators help making the system more <br id="linebreak" />
        decentralized and censorship-resistant.
      </SecondaryLabel>
      <CardWrapper>
        <WebsiteCard>
          <ImageWrapper>
            <Image src="/static/images/SyncLogo.svg" alt="Sync Logo" height={140} width={116} />
          </ImageWrapper>
          <LogoLabel>SYNC</LogoLabel>
          <SecondaryButton>VISIT</SecondaryButton>
        </WebsiteCard>
        <WebsiteCard>
          <ImageWrapper>
            <Image src="/static/images/DSynthsLogo.svg" alt="Dsynth Logo" height={144} width={150} />
          </ImageWrapper>
          <LogoLabel>DSYNTHS</LogoLabel>
          <SecondaryButton>VISIT</SecondaryButton>
        </WebsiteCard>
      </CardWrapper>
      <SecondaryLabel>Want to host your own SYNC frontend?</SecondaryLabel>
      <SecondaryButton>Get started</SecondaryButton>
    </Wrapper>
  )
}
