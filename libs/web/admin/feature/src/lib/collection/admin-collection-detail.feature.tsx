import { Anchor, Badge, Box, Group, Stack, Text } from '@mantine/core'
import { UiBackButton, UiDebug, UiErrorLoader, UiTabRoutes } from '@pubkeyapp/web/ui/core'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { useAdminGetCollectionQuery } from '@pubkeyapp/web/util/sdk'
import { Link, useParams } from 'react-router-dom'

export function AdminCollectionDetailFeature() {
  const { collectionId } = useParams<{ collectionId: string }>()
  const [{ data, error, fetching }] = useAdminGetCollectionQuery({
    variables: { collectionId: collectionId as string },
  })

  return (
    <UiErrorLoader error={error} loading={fetching}>
      <UiPage title={`Collection ${collectionId}`} leftAction={<UiBackButton />}>
        <UiTabRoutes
          tabs={[
            {
              label: 'Overview',
              value: 'overview',
              component: (
                <Stack>
                  <Box p="md">
                    <Stack>
                      <Group spacing="xs">
                        <Text>Collection</Text>
                        <Anchor component={Link} to={`${data?.item?.explorerUrl}`}>
                          {data?.item?.address}
                        </Anchor>
                      </Group>

                      <Text>
                        Cluster <Badge>{data?.item?.cluster}</Badge>
                      </Text>
                    </Stack>
                  </Box>
                  <UiDebug data={{ data }} />
                </Stack>
              ),
            },
          ]}
        />
      </UiPage>
    </UiErrorLoader>
  )
}
