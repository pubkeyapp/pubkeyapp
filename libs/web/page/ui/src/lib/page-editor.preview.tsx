import { Box, Stack, useMantineTheme } from '@mantine/core'
import { PageUiRender } from '@pubkeyapp/web/page/ui'
import { Page } from '@pubkeyapp/web/util/sdk'

export function PageEditorPreview({ page }: { page: Page }) {
  const theme = useMantineTheme()
  return (
    <Box m="auto" sx={{ border: `4px solid ${theme.colors.dark[9]}`, width: 408, height: 840, borderRadius: 40 }}>
      <Stack spacing={32} sx={{ height: 800, overflow: 'auto' }} my="md" py="md">
        <Stack spacing={64}>
          <PageUiRender page={page as any} width={400} hideShareButton />
        </Stack>
      </Stack>
    </Box>
  )
}
