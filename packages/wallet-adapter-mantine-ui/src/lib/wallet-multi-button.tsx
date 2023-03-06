import { Button, Menu } from '@mantine/core'
import { useWallet } from '@solana/wallet-adapter-react'
import { IconCopy, IconLogout, IconSwitchHorizontal } from '@tabler/icons-react'
import type { FC } from 'react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useWalletModal } from './use-wallet-modal'
import type { WalletButtonProps } from './wallet-button-props'
import { WalletConnectButton } from './wallet-connect-button'
import { WalletIcon } from './wallet-icon'
import { WalletModalButton } from './wallet-modal-button'

export const WalletMultiButton: FC<WalletButtonProps> = ({ children, ...props }) => {
  const { publicKey, wallet, disconnect } = useWallet()
  const { setVisible } = useWalletModal()
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLUListElement>(null)

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey])
  const content = useMemo(() => {
    if (children) return children
    if (!wallet || !base58) return null
    return base58.slice(0, 4) + '..' + base58.slice(-4)
  }, [children, wallet, base58])

  const copyAddress = useCallback(async () => {
    if (base58) {
      await navigator.clipboard.writeText(base58)
      setCopied(true)
      setTimeout(() => setCopied(false), 400)
    }
  }, [base58])

  const openModal = useCallback(() => {
    setVisible(true)
  }, [setVisible])

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const node = ref.current

      // Do nothing if clicking dropdown or its descendants
      if (!node || node.contains(event.target as Node)) return
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref])

  if (!wallet) return <WalletModalButton {...props}>{children}</WalletModalButton>
  if (!base58) return <WalletConnectButton {...props}>{children}</WalletConnectButton>

  return (
    <Menu withArrow offset={3}>
      <Menu.Target>
        <Button size="md" variant="default" radius="xl" leftIcon={<WalletIcon wallet={wallet} />} {...props}>
          {content}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={copyAddress} icon={<IconCopy size={16} />}>
          {copied ? 'Copied' : 'Copy address'}
        </Menu.Item>
        <Menu.Item onClick={openModal} icon={<IconSwitchHorizontal size={16} />}>
          Change wallet
        </Menu.Item>
        <Menu.Item onClick={disconnect} icon={<IconLogout size={16} />}>
          Disconnect
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
