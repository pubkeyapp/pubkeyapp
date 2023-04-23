import { Anchor, AnchorProps, Flex } from '@mantine/core'
import { useSolana } from '@pubkeyapp/web/shell/data-access'
import { ellipsify, UiCopyButton } from '@pubkeyapp/web/ui/core'
import { ClusterType } from '@pubkeyapp/web/util/sdk'
import { PublicKey } from '@solana/web3.js'

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
  const clusterSuffix = cluster?.id === ClusterType.SolanaMainnet ? '' : `?cluster=${cluster?.id?.toLowerCase()}`
  return (
    <Flex align="center">
      <UiCopyButton text={value.toString()} />
      <Anchor href={`${path}${clusterSuffix}`} sx={{ overflowWrap: 'anywhere' }} ff="monospace" fz="sm" ml={4}>
        {label ?? path}
      </Anchor>
    </Flex>
  )
}
