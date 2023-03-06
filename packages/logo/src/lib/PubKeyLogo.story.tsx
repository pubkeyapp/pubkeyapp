import { PubKeyLogoRounded } from './PubKeyLogoRounded'
import { PubKeyLogoText } from './PubKeyLogoText'

export default { title: 'logo/PubKeyLogo' }

export function Rounded() {
  return (
    <div style={{ padding: 40 }}>
      <PubKeyLogoRounded size={40} />
      <PubKeyLogoRounded size={40} inverted />
      <PubKeyLogoRounded size={40} color="cyan" />
      <PubKeyLogoRounded size={40} color="orange" />
      <PubKeyLogoRounded size={40} variant="devnet.pubkey.app" />
    </div>
  )
}
export function TextLogo() {
  return (
    <div style={{ padding: 40, backgroundColor: 'silver' }}>
      <PubKeyLogoText size={30} />
      <PubKeyLogoText size={30} inverted />
      <PubKeyLogoText size={30} color="cyan" />
      <PubKeyLogoText size={30} color="orange" />
      <PubKeyLogoText size={30} variant="devnet.pubkey.app" />
    </div>
  )
}
