import { Anchor, Badge, Box, Group, Stack, Text } from '@mantine/core'
import { UiBackButton, UiDebug, UiErrorLoader, UiTabRoutes } from '@pubkeyapp/web/ui/core'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { useAdminGetClusterQuery } from '@pubkeyapp/web/util/sdk'
import { Link, useParams } from 'react-router-dom'

export function AdminClusterDetailFeature() {
  const { clusterId } = useParams<{ clusterId: string }>()
  const [{ data, error, fetching }] = useAdminGetClusterQuery({
    variables: { clusterId: clusterId as string },
  })

  return (
    <UiErrorLoader error={error} loading={fetching}>
      <UiPage title={`Cluster ${clusterId}`} leftAction={<UiBackButton />}>
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
                        <Text>Cluster</Text>
                        <Anchor component={Link} to={`${data?.item?.explorer}`}>
                          {data?.item?.name}
                        </Anchor>
                      </Group>

                      <Text>
                        Type <Badge>{data?.item?.type}</Badge>
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
