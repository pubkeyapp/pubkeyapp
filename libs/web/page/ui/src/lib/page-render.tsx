import { Anchor, Badge, Box, Center, Container, Flex, Group, Stack, Tooltip } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { PubKeyLogo } from '@pubkeyapp/logo'
import { Page, User } from '@pubkeyapp/web/util/sdk'
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
  const owner = page?.owner as User
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
      {page?.profile ? <PageUserProfile profile={page.profile} /> : null}
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

export function PageWrapper({ hideShareButton, page }: { hideShareButton?: boolean; page: Page }) {
  const owner = page?.owner as User
  return (
    <Flex direction="column" justify="space-between" h={'100%'}>
      <Stack spacing={64} sx={{ overflow: 'auto' }} mb="xl" pb="xl">
        <PageUiRender page={page} hideShareButton={hideShareButton} />
      </Stack>
      <Stack spacing={'xl'} mt="xl" mb={54}>
        <Group position="center">
          <Tooltip label="Page status">
            <Badge>{page.status}</Badge>
          </Tooltip>
          <Tooltip label="PubKey ID">
            <Badge>PID#{owner?.pid}</Badge>
          </Tooltip>
        </Group>
        <Center>
          <Tooltip label={'Connect on PubKey'}>
            <Anchor component="a" href={`${page.siteUrl}`}>
              <PubKeyLogo size={32} />
            </Anchor>
          </Tooltip>
        </Center>
      </Stack>
    </Flex>
  )
}
