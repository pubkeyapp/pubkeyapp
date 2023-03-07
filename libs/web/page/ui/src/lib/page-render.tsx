import { Box, Container, Flex, Stack } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Page } from '@pubkeyapp/sdk'
import React from 'react'
import { PageBlockRender } from './blocks/page-block-render'
import { PageShareModal } from './page-share-modal'
import { PageUserProfile } from './page-user-profile'

export function PageUiRender({
  hideShareButton,
  page,
  width,
}: {
  hideShareButton?: boolean
  page: Page
  width?: number
}) {
  const mobileScreen = useMediaQuery('(max-width: 600px)')
  return (
    <Container size="sm" miw={width ? width : mobileScreen ? 400 : 600} sx={{}} px={10} m={0}>
      {hideShareButton ? null : (
        <Box m={24}>
          <Flex justify="end">
            <PageShareModal page={page} />
          </Flex>
        </Box>
      )}
      {page?.owner ? <PageUserProfile user={page?.owner} /> : null}
      <Box mt={24}>
        <Stack spacing={width ? 32 : mobileScreen ? 32 : 64} sx={{}}>
          {page?.blocks?.map((block) => (
            <Box key={block.id}>
              <PageBlockRender block={block} color={page.color ?? ''} />
            </Box>
          ))}
        </Stack>
      </Box>
    </Container>
  )
}
