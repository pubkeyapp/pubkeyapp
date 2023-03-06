import { MantineColor, useMantineTheme } from '@mantine/core'
import { ComponentPropsWithoutRef } from 'react'

export type PubKeyLogoVariant = 'pubkey.app' | 'devnet.pubkey.app'

export interface LogoProps extends ComponentPropsWithoutRef<'svg'> {
  color?: MantineColor
  variant?: PubKeyLogoVariant
  size?: number
  inverted?: boolean
}

export function usePubKeyLogoColors(
  color?: MantineColor,
  variant: PubKeyLogoVariant = 'pubkey.app',
  inverted: boolean = false,
) {
  const theme = useMantineTheme()

  if (variant === 'pubkey.app') {
    return {
      background: inverted ? theme.white : theme.fn.themeColor(color || theme.primaryColor, 7),
      color: inverted ? theme.fn.themeColor(color || theme.primaryColor, 7) : theme.white,
    }
  }

  return {
    background: theme.colorScheme === 'dark' ? theme.colors.grape[7] : theme.colors.grape[7],
    color: theme.colorScheme === 'dark' ? theme.white : theme.white,
  }
}
