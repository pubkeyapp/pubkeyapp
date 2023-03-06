import { Box, Container, Paper } from '@mantine/core'
import { HomepageSectionHero } from './homepage-section-hero'

export function HomepageFeature() {
  return (
    <Box>
      <HomepageSectionHero />
    </Box>
  )
}

export function HomepageContentFeature({ page }: { page: string }) {
  return (
    <Container>
      <Paper>TBD: {page}</Paper>
    </Container>
  )
}
