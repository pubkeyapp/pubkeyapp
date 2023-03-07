import { Anchor, Badge, Box, Button, Group, Stack } from '@mantine/core'
import { Page, PageStatus, PageType } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { Link } from 'react-router-dom'
import { PageTypeIcon } from './page-type-icon'

export function PageList({ createPage, pages }: { createPage?: (type: PageType) => Promise<void>; pages: Page[] }) {
  const types = [PageType.Personal, PageType.Professional, PageType.Gaming, PageType.Degen]
  const missingTypes = types.filter((type) => !pages.find((page) => page.type === type))

  return (
    <Stack spacing="xl">
      {pages?.map((page) => (
        <Box key={page.id}>
          <Group position="apart">
            <Group>
              <PageTypeIcon type={page.type as PageType} size={24} />
              <Anchor component={Link} to={`/pages/${page.id}`} size="xl">
                {page.type}: {page.title}
              </Anchor>
              <Badge color={page.status === PageStatus.Published ? 'green' : 'brand'} variant="outline">
                {page.status}
              </Badge>
            </Group>
            <Group spacing="xs">
              <Button size="sm" component={Link} to={`/pages/${page.id}`}>
                Edit
              </Button>
              <Button size="sm" component={Link} to={`${page.previewUrl}`}>
                Preview
              </Button>
            </Group>
          </Group>
        </Box>
      ))}

      {createPage ? (
        <Group>
          {missingTypes?.map((type) => (
            <Button
              key={type}
              size="lg"
              variant="default"
              leftIcon={<PageTypeIcon type={type as PageType} size={24} />}
              onClick={() => createPage(type)}
            >
              Create {type} Page
            </Button>
          ))}
        </Group>
      ) : null}
    </Stack>
  )
}
