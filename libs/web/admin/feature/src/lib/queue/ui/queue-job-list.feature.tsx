import { Alert, Box, Button, Flex, Group, Stack, Text } from '@mantine/core'
import { UiLoader } from '@pubkeyapp/web/ui/core'
import { Job, JobStatus, QueueType, useQueueDeleteJobMutation, useQueueJobsQuery } from '@pubkeyapp/web/util/sdk'
import { IconTrash } from '@tabler//icons-react'

import { useState } from 'react'

export function QueueJobListFeature({ type }: { type: QueueType }) {
  const [status, setStatus] = useState<JobStatus>(JobStatus.Active)
  const [{ data, fetching }, refresh] = useQueueJobsQuery({
    variables: { type, statuses: [status.toLowerCase() as JobStatus] },
  })
  const [, deleteJob] = useQueueDeleteJobMutation()

  return (
    <Stack spacing={24}>
      <Box>
        <Group>
          {Object.keys(JobStatus).map((status) => (
            <Button key={status} onClick={() => setStatus(status as JobStatus)}>
              {status}
            </Button>
          ))}
        </Group>
      </Box>
      {fetching ? (
        <UiLoader />
      ) : (
        <QueueJobList
          deleteJob={(jobId) => deleteJob({ type, jobId })}
          jobs={data?.items ?? []}
          refresh={() => refresh()}
          status={status}
          type={type}
        />
      )}
    </Stack>
  )
}

export function QueueJobList({
  deleteJob,
  jobs,
  status,
  refresh,
  type,
}: {
  deleteJob: (jobId: string) => void
  jobs: Job[]
  refresh: () => void
  status: JobStatus
  type: QueueType
}) {
  return (
    <Stack>
      {!jobs?.length ? (
        <Alert color="b">
          The {type} queue has no {status} jobs
        </Alert>
      ) : (
        <Stack spacing={4}>
          <Alert color="info">
            The {type} queue has {jobs?.length} ${status} jobs
          </Alert>

          <Box>
            {jobs?.map((job) => (
              <Box key={job.id}>
                <Stack mb={2}>
                  <Flex>
                    <Button>
                      <IconTrash
                        onClick={() => {
                          deleteJob(`${job.id}`)
                          refresh()
                        }}
                      />
                    </Button>
                    <Box>
                      <Box>{job.id}</Box>
                    </Box>
                  </Flex>
                  {job.failedReason ? <Alert color="red">{job.failedReason}</Alert> : null}
                </Stack>
                <Box pb={4}>
                  <QueueJobListItem job={job} type={type} />
                </Box>
              </Box>
            ))}
          </Box>
        </Stack>
      )}
      {/*<Box as="pre" p="2" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="2xs">*/}
      {/*  {JSON.stringify(jobs, null, 2)}*/}
      {/*</Box>*/}
    </Stack>
  )
}

export function QueueJobListItem({ job, type }: { job: Job; type: QueueType }) {
  return (
    <Stack>
      {job.stacktrace?.length ? (
        <Stack>
          <Text size="lg">Stack Trace</Text>
          <Box component="pre" p="2" fz="xs">
            {job.stacktrace}
          </Box>
        </Stack>
      ) : null}
      {type === QueueType.CloseAccount ? (
        <Stack>
          <Text size="lg">Requested Account</Text>
          <Box component="pre" p="2" fz="xs">
            {JSON.stringify(
              {
                account: job?.data?.account,
                mint: job?.data?.mint,
                info: job?.data?.info,
              },
              null,
              2,
            )}
          </Box>
          <Text size="lg">Server App</Text>
          <Box component="pre" p="2" fz="xs">
            {JSON.stringify(job?.data?.serverApp, null, 2)}
          </Box>
        </Stack>
      ) : null}
      {type === QueueType.ParseBlock ? (
        <Stack>
          <Text size="lg">ParseBlock</Text>
          <Box component="pre" p="2" fz="xs">
            {JSON.stringify(
              {
                data: job?.data,
              },
              null,
              2,
            )}
          </Box>
        </Stack>
      ) : null}

      {/*<Box component="pre" p="2" fz="xs">*/}
      {/*  {JSON.stringify({ type, job }, null, 2)}*/}
      {/*</Box>*/}
    </Stack>
  )
}
