import { Anchor, AnchorProps, Flex } from '@mantine/core'
import { useSolana } from '@pubkeyapp/web/shell/data-access'
import { ClusterType } from '@pubkeyapp/web/util/sdk'
import { PublicKey } from '@solana/web3.js'
import { UiCopyButton } from './ui-copy.button'

export function ellipsify(str = '', len = 4) {
  if (str.length > 30) {
    return str.substring(0, len) + '..' + str.substring(str.length - len, str.length)
  }
  return str
}

const prefix = 'https://solscan.io'

export function LinkAccount(
  props: AnchorProps & {
    address: string | PublicKey
    ellipsis?: boolean
    label?: string
    prefix?: string
  },
) {
  const { ellipsis = true } = props
  let { address, label } = props
  address = typeof address === 'string' ? address : address.toBase58()

  label = label ? label : ellipsis ? ellipsify(address, 8) : address

  return (
    <LinkExplorer value={address} path={`${props.prefix ? props.prefix : prefix}/account/${address}`} label={label} />
  )
}

export function LinkExplorer({ label, path, value }: { label?: string; path: string; value: string | number }) {
  const { cluster } = useSolana()
  const clusterSuffix = cluster?.id === ClusterType.Mainnet ? '' : `?cluster=${cluster?.id?.toLowerCase()}`
  return (
    <Flex align="center">
      <UiCopyButton text={value.toString()} />
      <Anchor href={`${path}${clusterSuffix}`} sx={{ overflowWrap: 'anywhere' }} ff="monospace" fz="sm" ml={4}>
        {label ?? path}
      </Anchor>
    </Flex>
  )
}
