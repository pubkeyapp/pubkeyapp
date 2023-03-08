import { Box, Button, Container, Stack, Tooltip } from '@mantine/core'
import { User } from '@pubkeyapp/sdk'
import { PageTypeColor, PageTypeIcon, PageUserProfile } from '@pubkeyapp/web/page/ui'
import { UiError, UiErrorLoader } from '@pubkeyapp/web/ui/core'
import { PageType, useUserPagesQuery, useUserQuery } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

export function ProfileDetailsFeature() {
  const { username } = useParams<{ username: string }>()
  const [{ data, fetching, error }] = useUserQuery({ variables: { username: `${username}` } })
  const [{ data: pagesData, fetching: pagesFetching, error: pagesError }] = useUserPagesQuery({
    variables: { username: '' + username },
  })

  return (
    <UiErrorLoader error={error ?? pagesError} loading={fetching ?? pagesFetching}>
      {data?.item ? (
        <Container size="md" mt={48}>
          <Stack>
            <PageUserProfile user={data.item as User} />
            <Container size="md" miw={400}>
              <Box>
                {pagesData?.items?.map((page) => (
                  <Box key={page.id} my="xl">
                    {page.viewUrl ? (
                      <Tooltip label={`View the page on ${page.viewUrl}`}>
                        <Button
                          fullWidth
                          component="a"
                          href={page.viewUrl}
                          target="_blank"
                          size="xl"
                          variant="default"
                          leftIcon={<PageTypeIcon type={page.type as PageType} size={24} />}
                          color={PageTypeColor({ type: page.type as PageType })}
                        >
                          {page.type}
                        </Button>
                      </Tooltip>
                    ) : (
                      <Tooltip label="Page is not online yet, showing preview">
                        <Button
                          fullWidth
                          component={Link}
                          to={`${page.previewUrl}`}
                          target="_blank"
                          size="xl"
                          variant="default"
                          leftIcon={<PageTypeIcon type={page.type as PageType} size={24} />}
                          color={PageTypeColor({ type: page.type as PageType })}
                        >
                          {page.type}
                        </Button>
                      </Tooltip>
                    )}
                  </Box>
                ))}
              </Box>
            </Container>
          </Stack>
        </Container>
      ) : (
        <UiError error="User not found..." />
      )}
    </UiErrorLoader>
  )
}
