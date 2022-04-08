import React, { useState, useCallback } from 'react'
import styled, { useTheme } from 'styled-components'
import { Currency } from '@sushiswap/core-sdk'
import { darken } from 'polished'

import useWeb3React from 'hooks/useWeb3'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { maxAmountSpend } from 'utils/currency'
import useCurrencyLogo from 'hooks/useCurrencyLogo'
import { useRegistrarByContract } from 'lib/synchronizer/hooks'

import DEI from '/public/static/images/tokens/dei.svg'
import ImageWithFallback from 'components/ImageWithFallback'
import RegistrarsModal from 'components/RegistrarsModal'
import { ChevronDown } from 'components/Icons'
import { Button } from 'rebass'
import { BaseButton, PrimaryButton } from 'components/Button'

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
`

const MaxButton = styled(BaseButton)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  right: 0.5rem;
  font-size: 0.75rem;
  background: ${({ theme }) => theme.text1};
  color: ${({ theme }) => theme.text2};
  width: fit-content;
  height: fit-content;
  padding: 2px 6px !important;
  margin: 0.9rem;
  border-radius: 0.5rem;

  &:hover {
    outline: none;
    opacity: 0.9;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
  margin: 0.75rem;
  `}
`

const InputWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`

const InputField = styled.input`
  text-align: left;
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  font-size: 1.25rem;
  width: 100%;
  background: ${({ theme }) => theme.bg3};
  border: 2px solid ${({ theme }) => theme.border2};
  border-radius: 20px;
  color: ${({ theme }) => theme.text4};
  margin-bottom: 1.25rem;

  &:focus,
  &:hover {
    outline: none;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 1rem;
    margin-bottom: 1rem;
  `}
`

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group
const NumericalInput = ({
  value,
  onUserInput,
  placeholder,
  showMax,
  ...rest
}: {
  value: string | number
  onUserInput: (input: string) => void
  placeholder: string
  showMax?: boolean
} & Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'as'>) => {
  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      onUserInput(nextUserInput)
    }
  }

  return (
    <InputWrapper>
      <InputField
        {...rest}
        value={value}
        onChange={(event) => {
          // replace commas with periods
          enforcer(event.target.value.replace(/,/g, '.'))
        }}
        // universal input options
        inputMode="decimal"
        title="Amount"
        autoComplete="off"
        autoCorrect="off"
        // text-specific options
        type="text"
        pattern="^[0-9]*[.,]?[0-9]*$"
        placeholder={placeholder || '0.00'}
        min={0}
        minLength={1}
        maxLength={79}
        spellCheck="false"
      />
      {showMax && <MaxButton>MAX</MaxButton>}
    </InputWrapper>
  )
}

export default function InputBox({
  value,
  showMax,
  onChange,
}: {
  value: string
  showMax?: boolean
  onChange(x?: string): void
}) {
  const { account } = useWeb3React()
  // default this to sync balance
  // const balance = useCurrencyBalance(account ?? undefined, currency ?? undefined)

  // const handleClick = useCallback(() => {
  //   if (!balance || !onChange) return
  //   onChange(maxAmountSpend(balance)?.toExact())
  // }, [balance, onChange])

  return (
    <>
      <Wrapper>
        {/* <Balance onClick={handleClick}>
          {balance ? balance.toSignificant(6) : '0.00'} SYNC
          {showMax && <span>MAX</span>}
        </Balance> */}
        <NumericalInput
          value={value || ''}
          onUserInput={onChange}
          placeholder={'Enter an amount'}
          autoFocus
          showMax={showMax}
        />
      </Wrapper>
    </>
  )
}
