import { Box, Container, Flex, Group, Paper, Stack, Text, useMantineTheme } from '@mantine/core'
import { MantineNumberSize } from '@mantine/styles'
import { ReactNode } from 'react'

export interface UiPageHeaderProps {
  title?: ReactNode
  leftAction?: ReactNode
  rightAction?: ReactNode
}

export interface UiPageProps extends UiPageHeaderProps {
  children: ReactNode
}

export function UiPage({ children, ...props }: UiPageProps) {
  return (
    <Container my="md">
      <Stack>
        {props.leftAction || props.rightAction || props.title ? <UiPageHeader {...props} /> : null}
        <Box>{children}</Box>
      </Stack>
    </Container>
  )
}

export function UiPageHeader({ leftAction, rightAction, title }: UiPageHeaderProps) {
  const theme = useMantineTheme()
  return (
    <Paper withBorder>
      <Group position="apart" align="center">
        <Group spacing={theme.spacing.sm} noWrap sx={{ overflow: 'hidden' }}>
          {leftAction ? leftAction : null}
          {typeof title === 'string' ? <UiPageHeaderTitle title={title} /> : title}
        </Group>
        <Group>{rightAction ? rightAction : null}</Group>
      </Group>
    </Paper>
  )
}

export function UiPageHeaderTitle({ size, title }: { size?: MantineNumberSize; title: ReactNode }) {
  const theme = useMantineTheme()
  return (
    <Text size={size ?? theme.fontSizes.lg} weight="bold" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
      {title}
    </Text>
  )
}
