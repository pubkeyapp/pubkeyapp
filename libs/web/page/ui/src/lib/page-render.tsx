import { Box, Center, Container, Flex, Paper, Stack } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Page } from '@pubkeyapp/sdk'
import React from 'react'
import { PageBlockRender } from './blocks/page-block-render'
import { PageShareModal } from './page-share-modal'
import { PageUserProfile } from './page-user-profile'

export function PageUiRender({ page }: { page: Page }) {
  const mobileScreen = useMediaQuery('(max-width: 600px)')
  return (
    <Container size="sm" miw={mobileScreen ? 400 : 600}>
      <Paper mt={24}>
        <Flex justify="end">
          <PageShareModal page={page} />
        </Flex>
      </Paper>
      <PageUserProfile user={page?.owner} />
      <Paper mt={24}>
        <Stack spacing={mobileScreen ? 32 : 64}>
          {page?.blocks?.map((block) => (
            <Box key={block.id}>
              <Center>
                <PageBlockRender block={block} color={page.color} />
              </Center>
            </Box>
          ))}
        </Stack>
      </Paper>
    </Container>
  )
}
