import { Modal } from '@mantine/core'
import type { FC, ReactNode } from 'react'
import React, { useState } from 'react'
import { WalletModalContext } from './use-wallet-modal'
import { WalletModal, WalletModalProps } from './wallet-modal'

export interface WalletModalProviderProps extends WalletModalProps {
  children: ReactNode
}

export const WalletModalProvider: FC<WalletModalProviderProps> = ({ children, ...props }) => {
  const [visible, setVisible] = useState(false)

  return (
    <WalletModalContext.Provider
      value={{
        visible,
        setVisible,
      }}
    >
      {children}
      <Modal opened={visible} onClose={() => setVisible(false)} centered radius="xl">
        <WalletModal {...props} />
      </Modal>
    </WalletModalContext.Provider>
  )
}
