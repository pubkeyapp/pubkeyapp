import { PubKeyLogoRounded } from './PubKeyLogoRounded'
import { PubKeyLogoText } from './PubKeyLogoText'
import { LogoProps } from './use-pubkey-logo-colors'

export interface PubKeyLogoProps extends LogoProps {
  type?: 'mark' | 'full'
}

export function PubKeyLogo({ type, ...others }: PubKeyLogoProps) {
  if (type === 'mark') {
    return <PubKeyLogoRounded {...others} />
  }

  return <PubKeyLogoText {...others} />
}
