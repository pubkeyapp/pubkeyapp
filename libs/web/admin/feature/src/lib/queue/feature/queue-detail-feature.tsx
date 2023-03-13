import { Alert, Badge, Box, Button, Group, Paper, Stack, Tooltip } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { UiLoader } from '@pubkeyapp/web/ui/core'
import { UiPage } from '@pubkeyapp/web/ui/page'
import {
  QueueType,
  useAdminCleanQueueMutation,
  useAdminGetQueueQuery,
  useAdminPauseQueueMutation,
  useAdminResumeQueueMutation,
} from '@pubkeyapp/web/util/sdk'
import { IconPlayerPause, IconPlayerPlay, IconRefresh, IconTrash } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { QueueCountStats } from '../ui/queue-count.stats'
import { QueueJobListFeature } from '../ui/queue-job-list.feature'

const DEFAULT_TIMEOUT = 5000

export function QueueDetailFeature() {
  const [timeout, setTimeout] = useState(DEFAULT_TIMEOUT)
  const { type } = useParams<{ type: string }>()
  const [{ data, fetching }, refresh] = useAdminGetQueueQuery({
    variables: { type: `${type}` as QueueType },
  })

  const [, cleanQueue] = useAdminCleanQueueMutation()
  const [, pauseQueue] = useAdminPauseQueueMutation()
  const [, resumeQueue] = useAdminResumeQueueMutation()

  useEffect(() => {
    if (!type) return

    const timer = setInterval(() => {
      refresh()
    }, timeout)

    return () => {
      clearInterval(timer)
    }
  }, [timeout, type])

  useEffect(() => {
    if (!data?.item || data?.item?.isPaused || (data?.item?.count?.waiting ?? 0) < 1) {
      if (timeout !== DEFAULT_TIMEOUT) {
        console.log('Setting timeout to 5 seconds')
        setTimeout(DEFAULT_TIMEOUT)
      }
      return
    }
    if (timeout !== 1000) {
      console.log('Setting timeout to 1 second')
      setTimeout(1000)
    }
  }, [data?.item?.count, data?.item?.isPaused, timeout])

  const toastError = (message: string) => {
    showNotification({
      title: 'Error',
      message,
      color: 'red',
    })
  }
  const toastSuccess = (message: string) => {
    showNotification({
      title: 'Success',
      message,
      color: 'green',
    })
  }

  const clean = () => {
    cleanQueue({ type: type as QueueType })
      .then((res) => {
        if (res.error) {
          return toastError(res.error.message)
        }
        refresh()
        toastSuccess('Queue cleaned')
      })
      .catch((error) => toastError(error.message))
  }

  const resume = () => {
    resumeQueue({ type: type as QueueType })
      .then((res) => {
        if (res.error) {
          return toastError(res.error.message)
        }
        refresh()
        toastSuccess('Queue resumed')
      })
      .catch((error) => toastError(error.message))
  }
  const pause = () => {
    pauseQueue({ type: type as QueueType })
      .then((res) => {
        if (res.error) {
          return toastError(res.error.message)
        }
        refresh()
        toastSuccess('Queue paused')
      })
      .catch((error) => toastError(error.message))
  }

  const form = useForm({
    initialValues: {
      serverAppId: '',
      payload: '',
    },

    validate: {
      serverAppId: (value) => (value.length > 0 ? null : 'App is required'),
      payload: (value) => (value.length > 0 ? null : 'Payload is required'),
    },
  })
  if (!data?.item && fetching) {
    return <UiLoader />
  }

  if (!data?.item) {
    return <Alert color="red">Queue not found :(</Alert>
  }

  return (
    <UiPage title={`${data?.item?.name}`}>
      <Stack>
        <Paper>
          <Group>
            <Box>
              <Badge>{data?.item?.isPaused ? 'Paused' : 'Started'}</Badge>
            </Box>
            {data?.item?.isPaused ? (
              <Button onClick={() => resume()} leftIcon={<IconPlayerPlay />}>
                Resume
              </Button>
            ) : (
              <Button onClick={() => pause()} leftIcon={<IconPlayerPause />}>
                Pause
              </Button>
            )}
            <Tooltip label={`Automatic refresh each ${timeout / 1000} seconds`}>
              <Button onClick={() => refresh()} leftIcon={<IconRefresh />}>
                Refresh
              </Button>
            </Tooltip>
            <Tooltip label={`This will remove all the jobs from the queue.`}>
              <Button onClick={() => clean()} leftIcon={<IconTrash />}>
                Clean
              </Button>
            </Tooltip>
          </Group>
        </Paper>
        {data?.item?.count ? (
          <Paper>
            <QueueCountStats count={data.item.count} />
          </Paper>
        ) : null}
        {data?.item?.info ? (
          <Paper>
            <Box component="pre" p="2" fz="xs">
              {JSON.stringify(data?.item?.info, null, 2)}
            </Box>
          </Paper>
        ) : null}
        {/*<Paper>*/}
        {/*  <Stack spacing={4}>*/}
        {/*    <form onSubmit={form.onSubmit((values) => submit(values))}>*/}
        {/*      <Stack spacing={16}>*/}
        {/*        <Text fz="2xl">{type}</Text>*/}
        {/*        {type === QueueType.AccountClose ? (*/}
        {/*          <Text>The payload for the AccountClose queue is a newline-separated list of accounts to close.</Text>*/}
        {/*        ) : null}*/}
        {/*        <Textarea*/}
        {/*          withAsterisk*/}
        {/*          minRows={6}*/}
        {/*          maxRows={20}*/}
        {/*          label="Payload"*/}
        {/*          placeholder="Payload"*/}
        {/*          {...form.getInputProps('payload')}*/}
        {/*        />*/}

        {/*        <Group position="right" mt="md">*/}
        {/*          <Button type="submit">Load Queue</Button>*/}
        {/*        </Group>*/}
        {/*      </Stack>*/}
        {/*    </form>*/}
        {/*  </Stack>*/}
        {/*</Paper>*/}
        <Paper>
          {data.item.type ? <QueueJobListFeature type={data.item.type} /> : null}
          {/*<Box as="pre" p="2" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="2xs">*/}
          {/*  {JSON.stringify(data, null, 2)}*/}
          {/*</Box>*/}
        </Paper>
      </Stack>
    </UiPage>
  )
}
