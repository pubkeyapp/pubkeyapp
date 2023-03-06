import { NavLink, Text } from '@mantine/core'
import type { Wallet } from '@solana/wallet-adapter-react'
import type { FC, MouseEventHandler } from 'react'
import React from 'react'
import { WalletIcon } from './wallet-icon'

export enum WalletReadyState {
  /**
   * User-installable wallets can typically be detected by scanning for an API
   * that they've injected into the global context. If such an API is present,
   * we consider the wallet to have been installed.
   */
  Installed = 'Installed',
  NotDetected = 'NotDetected',
  /**
   * Loadable wallets are always available to you. Since you can load them at
   * any time, it's meaningless to say that they have been detected.
   */
  Loadable = 'Loadable',
  /**
   * If a wallet is not supported on a given platform (eg. server-rendering, or
   * mobile) then it will stay in the `Unsupported` state.
   */
  Unsupported = 'Unsupported',
}

export interface WalletListItemProps {
  handleClick: MouseEventHandler<HTMLButtonElement>
  tabIndex?: number
  wallet: Wallet
}

export const WalletListItem: FC<WalletListItemProps> = ({ handleClick, tabIndex, wallet }) => {
  return (
    <NavLink
      sx={{ height: 48, borderRadius: 50 }}
      label={<Text size="lg">{wallet.adapter.name}</Text>}
      icon={<WalletIcon wallet={wallet} />}
      rightSection={wallet.readyState === WalletReadyState.Installed && <span>Detected</span>}
      variant="filled"
      onClick={handleClick}
    />
  )
}
