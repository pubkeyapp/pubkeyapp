import { Anchor, Badge, Box, Group, Stack, Text } from '@mantine/core'
import { UiBackButton, UiDebug, UiErrorLoader, UiTabRoutes } from '@pubkeyapp/web/ui/core'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { Collection, useAdminGetCollectionQuery } from '@pubkeyapp/web/util/sdk'
import { Link, useParams } from 'react-router-dom'
import { CollectionMintList } from './collection-mint.list'

export function AdminCollectionDetailFeature() {
  const { collectionId } = useParams<{ collectionId: string }>()
  const [{ data, error, fetching }, refresh] = useAdminGetCollectionQuery({
    variables: { collectionId: collectionId as string },
  })

  return (
    <UiErrorLoader error={error} loading={fetching}>
      <UiPage title={`Collection ${data?.item?.name}`} leftAction={<UiBackButton />}>
        <UiTabRoutes
          tabs={[
            {
              label: 'Overview',
              value: 'overview',
              component: data?.item ? <CollectionMintOverview collection={data.item} /> : null,
            },
            {
              label: 'Mints',
              value: 'mints',
              component: data?.item ? <CollectionMintList collection={data.item} /> : null,
            },
          ]}
        />
      </UiPage>
    </UiErrorLoader>
  )
}

export function CollectionMintOverview({ collection }: { collection: Collection }) {
  return (
    <Stack>
      <Box p="md">
        <Stack>
          <Group spacing="xs">
            <Text>Collection</Text>
            <Anchor component={Link} to={`${collection.explorerUrl}`}>
              {collection.address}
            </Anchor>
          </Group>

          <Text>
            Cluster <Badge>{collection.cluster}</Badge>
          </Text>
        </Stack>
      </Box>
      <UiDebug data={collection} open />
    </Stack>
  )
}
