import { Box, SimpleGrid } from '@mantine/core'
import { UiDebug } from '@pubkeyapp/web/ui/core'
import { Mint } from '@pubkeyapp/web/util/sdk'
import { MintCard } from './mint-card'

export function MintGrid({ mints }: { mints: Mint[] }) {
  return (
    <SimpleGrid cols={3} mt="md">
      {mints.map((mint) => {
        return <Box key={mint.id}>{mint.metadata ? <MintCard mint={mint} /> : <UiDebug data={mint} open />}</Box>
      })}
    </SimpleGrid>
  )
}
