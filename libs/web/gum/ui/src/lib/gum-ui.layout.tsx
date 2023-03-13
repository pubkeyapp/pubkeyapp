import { Anchor, Box, Container, Group } from '@mantine/core'
import { GumLogo } from '@pubkeyapp/web/apps/ui'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function GumUiLayout(props: { children: ReactNode; link: string }) {
  return (
    <Container py={32} size="md" h="100%">
      <Group position="center" pb={16}>
        <Anchor component={Link} to={props.link} sx={{ display: 'flex' }}>
          <GumLogo width={128} />
        </Anchor>
      </Group>
      <Box h="100%">{props.children}</Box>
    </Container>
  )
}
