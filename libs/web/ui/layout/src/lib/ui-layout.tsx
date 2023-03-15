import { Box, Container, Flex, Stack } from '@mantine/core'
import { PubKeyLogo } from '@pubkeyapp/logo'
import { UiLoader } from '@pubkeyapp/web/ui/core'
import { IconBrandDiscord, IconBrandGithub, IconBrandTwitter } from '@tabler/icons-react'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { UiAppFooter } from './ui-app-footer'
import { UiFooter } from './ui-footer'
import { UiHeader, UiLinkGroup, UiLinks } from './ui-header'
import { UiHomepageHeader } from './ui-homepage-header'

export function UiLayout({ homepage = false }: { homepage?: boolean }) {
  const copyright = '© 2023 pubkey.app. All rights reserved.'
  const description = 'PubKey is a free, open-source, and censorship-resistant way to share your links and identities.'
  const logo = <PubKeyLogo size={36} />
  const headerLinks: UiLinks = [
    //  { link: '/dashboard', label: 'Dashboard' }
  ]
  const footerLinks: UiLinkGroup = [
    {
      title: 'Company',
      links: [
        { link: '/about', label: 'About' },
        { link: '/privacy', label: 'Privacy' },
        { link: '/terms', label: 'Terms' },
        { link: '/contact', label: 'Contact' },
      ],
    },
    {
      title: 'Community',
      links: [
        { link: 'https://github.com/pubkeyapp/pubkeyapp', label: 'GitHub', icon: IconBrandGithub },
        { link: 'https://twitter.com/PubKeyApp', label: 'Twitter', icon: IconBrandTwitter },
        { link: 'https://pubkey.app/join-discord', label: 'Discord', icon: IconBrandDiscord },
      ],
    },
  ]
  const homepageLinks = [
    {
      link: '/learn',
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
          link: '/sdk',
          label: 'SDK',
        },
        {
          link: '/support',
          label: 'Support',
        },
      ],
    },
    {
      link: '/pricing',
      label: 'Pricing',
    },
    {
      link: '/about',
      label: 'About',
    },
  ]
  return (
    <Flex mih="100vh" h="100vh" direction="column" justify="space-between">
      <Stack sx={{ flexGrow: 1 }}>
        {homepage ? (
          <Box my="xl" py="xl">
            <Container size="xl">
              <UiHomepageHeader links={homepageLinks} />
            </Container>
          </Box>
        ) : (
          <UiHeader links={headerLinks} logo={logo} />
        )}
        <Box h="100%">
          <Suspense fallback={<UiLoader type="full" />}>
            <Outlet />
          </Suspense>
        </Box>
      </Stack>
      {homepage ? (
        <UiFooter copyright={copyright} description={description} links={footerLinks} logo={logo} />
      ) : (
        <UiAppFooter copyright={copyright} logo={logo} />
      )}
    </Flex>
  )
}
