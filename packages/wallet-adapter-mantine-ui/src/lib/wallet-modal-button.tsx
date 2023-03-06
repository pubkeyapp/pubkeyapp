import { Button } from '@mantine/core'
import type { FC, MouseEvent } from 'react'
import React, { useCallback } from 'react'
import { useWalletModal } from './use-wallet-modal'
import type { WalletButtonProps } from './wallet-button-props'

export const WalletModalButton: FC<WalletButtonProps> = ({ children = 'Select Wallet', onClick, ...props }) => {
  const { visible, setVisible } = useWalletModal()

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (onClick) onClick(event)
      if (!event.defaultPrevented) setVisible(!visible)
    },
    [onClick, setVisible, visible],
  )

  return (
    <Button color="brand" size="md" radius="xl" onClick={handleClick} {...props}>
      {children}
    </Button>
  )
}
