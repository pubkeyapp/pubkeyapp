import { Group, Paper, SimpleGrid, Text } from '@mantine/core'
import { JobStatus, QueueCount } from '@pubkeyapp/web/util/sdk'

export function QueueCountStats({ count }: { count: QueueCount }) {
  const data: { label: JobStatus; value: number }[] = [
    { label: JobStatus.Active, value: count.active ?? 0 },
    { label: JobStatus.Waiting, value: count.waiting ?? 0 },
    { label: JobStatus.Completed, value: count.completed ?? 0 },
    { label: JobStatus.Paused, value: count.paused ?? 0 },
    { label: JobStatus.Failed, value: count.failed ?? 0 },
    { label: JobStatus.Delayed, value: count.delayed ?? 0 },
  ]
  return <JobStatusGrid data={data} />
}

export function JobStatusGrid({ data }: { data: { label: JobStatus; value: number }[] }) {
  const stats = data.map((stat) => {
    return (
      <Paper withBorder p="md" radius="md" key={stat.label}>
        <Group position="apart">
          <div>
            <Text color="dimmed" transform="uppercase" weight={700} size="xs">
              {stat.label}
            </Text>
            <Text weight={700} size="xl">
              {stat.value}
            </Text>
          </div>
        </Group>
      </Paper>
    )
  })

  return (
    <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      {stats}
    </SimpleGrid>
  )
}
