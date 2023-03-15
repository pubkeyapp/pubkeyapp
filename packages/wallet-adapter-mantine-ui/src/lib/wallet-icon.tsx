import { Image, ImageProps } from '@mantine/core'
import type { Wallet } from '@solana/wallet-adapter-react'

export interface WalletIconProps extends ImageProps {
  wallet: Wallet | null
}

export function WalletIcon({ wallet, ...props }: WalletIconProps) {
  return wallet ? (
    <Image src={wallet.adapter.icon} alt={`${wallet.adapter.name} icon`} height={28} width={28} {...props} />
  ) : null
}
