import React, { useCallback, useState } from 'react'
import useWeb3React from 'hooks/useWeb3'
import styled from 'styled-components'
import { BaseButton, PrimaryButton } from 'components/Button'
import { lighten } from 'polished'
import { Staking } from 'hooks/useStakeTokenPage'
import InputBox from '../Trade/InputBox'

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

const TitlePrimaryLabel = styled.div`
  font-size: 1.5rem;
  line-height: 2rem;
  color: ${({ theme }) => theme.text1};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 1rem;
    line-height: 1.25rem;
  `}

  >span {
    background: ${({ theme }) => theme.specialBG1};
    background-clip: text;
    text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    width: fit-content;
  }

  @media (min-width: 960px) {
    > span {
      display: none;
    }
  }
`

const Button = styled(PrimaryButton)`
  border-radius: 1.25rem;
  padding: 0.5rem 2rem;
  width: fit-content;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 0.25rem 1rem;
  `}
`

const SecondaryButton = styled(BaseButton)`
  background: ${({ theme }) => theme.bg1};
  color: ${({ theme }) => theme.text1};
  border-radius: 1.25rem;
  border: 1px solid transparent;
  padding: 0.5rem 2rem;
  width: fit-content;

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => lighten(0.05, theme.bg1)};
    border: 1px solid ${({ theme }) => theme.text1};
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 0.25rem 1rem;
    width: 50%;
  `}
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 1rem;
  margin-top: 1.25rem;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    justify-content: space-between;
    margin-top: 1rem;
  `}
`

const StakeDirectionWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.125);
`

const TitleSecondaryLabel = styled.div`
  font-size: 3rem;
  line-height: 4rem;
  background: ${({ theme }) => theme.specialBG1};
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: fit-content;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 1.25rem;
    line-height: 1.75rem;
    display: none;
  `}
`

const StakingTab = styled.div<{
  active: boolean
  isStake: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  padding: 1rem 3rem;
  min-width: 50%;
  line-height: 1.5rem;
  text-align: center;
  border-radius: ${({ isStake }) => (isStake ? '10px 0 0 0' : '0 10px 0 0')};
  background: ${({ theme }) => theme.bg2};
  border: 1px solid ${({ theme }) => theme.border2};
  color: ${({ theme }) => theme.text1};

  ${({ theme, active }) =>
    !active &&
    `
        background: ${theme.bg1};
        color: ${theme.text3};
    `};

  &:hover {
    cursor: pointer;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 0.5rem 0.5rem;
  `}
`

const StakeWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-basis: calc(50% - 2.5rem);
`

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  background: ${({ theme }) => theme.bg2};
  border: 1px solid ${({ theme }) => theme.border2};
  border-top-style: none;
  padding: 2rem;
  border-radius: 0 0 10px 10px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 0.5rem;
  `}
`

const HeaderWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

const ContentPrimaryLabel = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 1rem;
  line-height: 1.25rem;
  padding: 0rem 1.25rem;
  color: ${({ theme }) => theme.text3};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: none;
  `}
`

const ContentSecondaryLabel = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0rem 1.25rem;
  color: ${({ theme }) => theme.text4};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin-left: auto;
    font-size: 0.75rem;
    padding: 0rem 0.5rem;
  `}
`

const InputContainer = styled.input<{
  [x: string]: any
}>`
  padding: 0.75rem 1.25rem;
  background: ${({ theme }) => theme.bg3};
  border: 2px solid ${({ theme }) => theme.border2};
  border-radius: 1.25rem;
  font-size: 1.25rem;
  line-height: 1.5rem;
  color: ${({ theme }) => theme.text4};
  margin-bottom: 1.25rem;

  &:focus,
  &:hover {
    outline: none;
  }
`

const DetailsWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 5rem;
  margin-top: 3.5rem;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin-top: 1.5rem;
    flex-flow: column nowrap;
    gap: 2rem;
  `}
`

const InfoWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

const InfoPrimaryLabel = styled.div`
  font-size: 1rem;
  line-height: 1.25rem;
  color: ${({ theme }) => theme.text3};
  margin-bottom: 0.75rem;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 0.75rem;
    line-height: 1rem;
    margin-bottom: 0.5rem;
    `}
`

const InfoSecondaryLabel = styled.div`
  font-size: 2.25rem;
  line-height: 3rem;
  background: ${({ theme }) => theme.specialBG1};
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: fit-content;
  margin-bottom: 1.5rem;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 1.5rem;
    line-height: 1.75rem;
    margin-bottom: 1rem;
  `}
`

export default function StakeLP() {
  const { chainId, account } = useWeb3React()
  const [staking, setStaking] = useState(Staking.STAKE)

  const handleSwitchDirection = useCallback(
    (newStaking) => {
      if (newStaking === staking) return
      setStaking(newStaking)
    },
    [staking]
  )

  return (
    <Wrapper>
      <TitlePrimaryLabel>
        Stake SYNC LP for upto <span>42,690% APR</span>
      </TitlePrimaryLabel>
      <TitleSecondaryLabel>42,690% APR</TitleSecondaryLabel>
      <ButtonWrapper>
        <Button>Get SYNC LP</Button>
        <SecondaryButton>Add to wallet</SecondaryButton>
      </ButtonWrapper>
      <DetailsWrapper>
        <StakeWrapper>
          <StakeDirectionWrapper>
            <StakingTab
              isStake
              active={staking === Staking.STAKE}
              onClick={() => staking === Staking.UNSTAKE && handleSwitchDirection(Staking.STAKE)}
            >
              {Staking.STAKE}
            </StakingTab>
            <StakingTab
              isStake={false}
              active={staking === Staking.UNSTAKE}
              onClick={() => staking === Staking.STAKE && handleSwitchDirection(Staking.UNSTAKE)}
            >
              {Staking.UNSTAKE}
            </StakingTab>
          </StakeDirectionWrapper>
          {staking === Staking.STAKE ? (
            <ContentWrapper>
              <HeaderWrapper>
                <ContentPrimaryLabel>Amount of LP to stake</ContentPrimaryLabel>
                <ContentSecondaryLabel>Available: 69,420 LP</ContentSecondaryLabel>
              </HeaderWrapper>
              <InputBox currency={undefined} value={''} onChange={() => {}} showMax={true} />
              <Button style={{ width: '100%' }}>Approve</Button>
            </ContentWrapper>
          ) : (
            <ContentWrapper>
              <HeaderWrapper>
                <ContentPrimaryLabel>Amount of LP to unstake</ContentPrimaryLabel>
                <ContentSecondaryLabel>Staked: 42,690 LP</ContentSecondaryLabel>
              </HeaderWrapper>
              <InputBox currency={undefined} value={''} onChange={() => {}} showMax={true} />
              <Button style={{ width: '100%' }}>Approve</Button>
            </ContentWrapper>
          )}
        </StakeWrapper>
        <InfoWrapper>
          <InfoPrimaryLabel>Your LP Rewards</InfoPrimaryLabel>
          <InfoSecondaryLabel>420 SYNC</InfoSecondaryLabel>
          <Button>Claim Rewards</Button>
        </InfoWrapper>
      </DetailsWrapper>
    </Wrapper>
  )
}
