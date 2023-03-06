import { Box, Container, Stack } from '@mantine/core'
import { HeaderMenu } from './homepage-menu'
import { HomepageSectionHero } from './homepage-section-hero'

export function HomepageFeature() {
  return (
    <Box>
      <Container py="xl">
        <Stack mt="xl" pt="xl">
          <HeaderMenu
            links={[
              {
                link: '/about',
                label: 'Features',
              },
              {
                link: '#1',
                label: 'Learn',
                links: [
                  {
                    link: '/docs',
                    label: 'Documentation',
                  },
                  {
                    link: '/resources',
                    label: 'Resources',
                  },
                  {
                    link: '/community',
                    label: 'Community',
                  },
                ],
              },
              {
                link: '/about',
                label: 'About',
              },
              {
                link: '/pricing',
                label: 'Pricing',
              },
              {
                link: '#2',
                label: 'Support',
                links: [
                  {
                    link: '/faq',
                    label: 'FAQ',
                  },
                  {
                    link: '/demo',
                    label: 'Book a demo',
                  },
                  {
                    link: '/forums',
                    label: 'Forums',
                  },
                ],
              },
            ]}
          />
        </Stack>
      </Container>
      <HomepageSectionHero />
    </Box>
  )
}
