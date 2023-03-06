import { Box, Card, CardSection, SimpleGrid, Stack, Text } from '@mantine/core'
import { UiLoader } from '@pubkeyapp/web/ui/core'
import { UiPage } from '@pubkeyapp/web/ui/page'
import { useQueuesQuery } from '@pubkeyapp/web/util/sdk'
import { Link } from 'react-router-dom'
import { QueueCountStats } from '../ui/queue-count.stats'

export function QueueListFeature() {
  const [{ data, fetching }] = useQueuesQuery()

  return (
    <UiPage title="Queues">
      {fetching ? (
        <UiLoader />
      ) : (
        <Stack>
          <SimpleGrid>
            {data?.items?.map(({ count, name, type }) => (
              <Card key={name}>
                <Stack>
                  <Box px={8}>
                    <Text size="lg" weight={500} component={Link} to={type}>
                      {name}
                    </Text>
                  </Box>
                  {count ? <QueueCountStats count={count} /> : null}
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      )}
    </UiPage>
  )
}
