import { ButtonProps } from '@mantine/core'
import type { MouseEvent, PropsWithChildren } from 'react'

export type WalletButtonProps = PropsWithChildren<
  ButtonProps & {
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  }
>
