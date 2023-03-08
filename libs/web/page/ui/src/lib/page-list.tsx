import { Anchor, Badge, Box, Button, Group, Stack, Tooltip } from '@mantine/core'
import { Page, PageStatus, PageType } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { Link } from 'react-router-dom'
import { PageTypeIcon } from './page-type-icon'

export function PageList({ pages }: { pages: Page[] }) {
  return (
    <Stack spacing="xl">
      {pages?.map((page) => (
        <Box key={page.id}>
          <Group position="apart">
            <Group>
              <PageTypeIcon type={page.type as PageType} size={24} />
              <Tooltip label={`Edit the ${page.type} page`}>
                <Anchor component={Link} to={`/profiles/${page.id}`} size="xl">
                  {page.type}
                </Anchor>
              </Tooltip>
            </Group>
            <Group>
              <Badge color={page.status === PageStatus.Published ? 'green' : 'grape'} variant="outline">
                {page.status}
              </Badge>
              {page.viewUrl ? (
                <Tooltip label={`View the page on ${page.viewUrl}`}>
                  <Button size="xs" component="a" href={page.viewUrl} target="_blank">
                    View
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip label="Page is not online yet, showing preview">
                  <Button size="xs" component={Link} to={`${page.previewUrl}`} target="_blank" variant="default">
                    View
                  </Button>
                </Tooltip>
              )}
            </Group>
          </Group>
        </Box>
      ))}
    </Stack>
  )
}
