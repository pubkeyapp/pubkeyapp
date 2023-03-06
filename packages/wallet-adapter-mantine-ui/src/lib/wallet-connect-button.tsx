import { Button } from '@mantine/core'
import { useWallet } from '@solana/wallet-adapter-react'
import type { FC, MouseEventHandler } from 'react'
import React, { useCallback, useMemo } from 'react'
import type { WalletButtonProps } from './wallet-button-props'
import { WalletIcon } from './wallet-icon'

export const WalletConnectButton: FC<WalletButtonProps> = ({ children, disabled, onClick, ...props }) => {
  const { wallet, connect, connecting, connected } = useWallet()

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (onClick) onClick(event)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      if (!event.defaultPrevented) connect().catch(() => {})
    },
    [onClick, connect],
  )

  const content = useMemo(() => {
    if (children) return children
    if (connecting) return 'Connecting ...'
    if (connected) return 'Connected'
    if (wallet) return 'Connect'
    return 'Connect Wallet'
  }, [children, connecting, connected, wallet])

  return (
    <Button
      size="md"
      radius="xl"
      disabled={disabled || !wallet || connecting || connected}
      leftIcon={wallet ? <WalletIcon wallet={wallet} /> : undefined}
      onClick={handleClick}
      {...props}
    >
      {content}
    </Button>
  )
}
