import { Button, Paper, Stack, Text, useMantineTheme } from '@mantine/core'
import { PubKeyLogo } from '@pubkeyapp/logo'
import { ReactNode } from 'react'
import { UiPageHeaderTitle } from '@pubkeyapp/web/ui/page'

export function InviteCard({
  children,
  cta,
  ctaLabel,
  description,
  title,
}: {
  children?: ReactNode
  cta?: () => void
  ctaLabel?: string
  description: ReactNode
  title: string
}) {
  const theme = useMantineTheme()
  return (
    <Paper withBorder radius="md" p={theme.spacing.md} miw={500}>
      <Stack align="center" pt="lg">
        <Text color="brand">
          <PubKeyLogo size={36} />
        </Text>
        <UiPageHeaderTitle size="xl" title={title} />
        {typeof description === 'string' ? (
          <Text size="sm" color="dimmed">
            {description}
          </Text>
        ) : (
          description
        )}
        {children}
        {cta && ctaLabel ? (
          <Button onClick={cta} fullWidth size="xl" mt="xl">
            {ctaLabel}
          </Button>
        ) : null}
      </Stack>
    </Paper>
  )
}
