import { Anchor, Container, Stack, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

export function NotFoundFeature() {
  return (
    <Container my="md">
      <Stack>
        <Text size="xl">Page not found. :(</Text>
        <Anchor component={Link} to="/" color="brand">
          Click here to go back to root page.
        </Anchor>
      </Stack>
    </Container>
  )
}
