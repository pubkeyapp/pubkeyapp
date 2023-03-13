import { Card, createStyles, rem, SimpleGrid, Text, Tooltip, UnstyledButton } from '@mantine/core'
import { Identity, IdentityProvider, Page, PageBlockType } from '@pubkeyapp/web/util/sdk'
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconCurrencySolana,
  IconExternalLink,
  IconHeading,
} from '@tabler/icons-react'
import React, { useMemo } from 'react'

const useStyles = createStyles((theme) => ({
  title: {
    fontWeight: 700,
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: rem(120),
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: theme.shadows.md,
      transform: 'scale(1.05)',
    },
  },
}))

export function PageEditorBlockPalette({
  page,
  addBlock,
}: {
  page: Page
  addBlock: (type: PageBlockType, data?: any) => void
}) {
  const { classes, theme } = useStyles()
  const icons = useMemo(() => {
    const identities = page?.profile?.identities ?? []
    return [
      {
        type: PageBlockType.Header,
        label: 'Header',
        icon: IconHeading,
        color: 'violet',
        data: { text: '## New Header' },
      },
      {
        type: PageBlockType.Link,
        label: 'Link',
        icon: IconExternalLink,
        color: 'indigo',
        data: { icon: '', label: 'PubKey', link: 'https://pubkey.app' },
      },
      {
        type: PageBlockType.Solana,
        label: 'Solana',
        icon: IconCurrencySolana,
        color: 'blue',
        data: identities.find((i) => i.provider === IdentityProvider.Solana),
      },
      {
        type: PageBlockType.Github,
        label: 'GitHub',
        icon: IconBrandGithub,
        color: 'green',
        data: identities.find((i) => i.provider === IdentityProvider.Github),
      },
      {
        type: PageBlockType.Discord,
        label: 'Discord',
        icon: IconBrandDiscord,
        color: 'teal',
        data: identities.find((i) => i.provider === IdentityProvider.Discord),
      },
      {
        type: PageBlockType.Twitter,
        label: 'Twitter',
        icon: IconBrandTwitter,
        color: 'cyan',
        data: identities.find((i) => i.provider === IdentityProvider.Twitter),
      },
      {
        type: PageBlockType.Google,
        label: 'Google',
        icon: IconBrandGoogle,
        color: 'pink',
        data: identities.find((i) => i.provider === IdentityProvider.Google),
      },
      {
        type: PageBlockType.Google,
        label: 'Instagram',
        icon: IconBrandInstagram,
        color: 'red',
        data: false,
      },
      {
        type: PageBlockType.Google,
        label: 'LinkedIn',
        icon: IconBrandLinkedin,
        color: 'orange',
        data: false,
      },
    ]
  }, [page.profile?.identities])

  const items = icons.map((item) => {
    return (
      <Tooltip
        key={item.label}
        label={
          item.data
            ? `Add a ${item.type} block to your page!`
            : `Link your ${item.type} data to the ${page.profile?.type} profile`
        }
      >
        <UnstyledButton
          className={classes.item}
          disabled={!item.data}
          onClick={() => {
            console.log('addBlock(item.type, item?.data as Identity)', item)
            addBlock(item.type, item?.data)
          }}
        >
          <item.icon color={item.data ? theme.colors[item.color][6] : 'gray'} size="3rem" />
          <Text size="xs" mt={7}>
            {item.label}
          </Text>
        </UnstyledButton>
      </Tooltip>
    )
  })
  return (
    <Card withBorder={false} radius="lg">
      {/*<Group position="apart">*/}
      {/*  <Text className={classes.title}>Integrations</Text>*/}
      {/*  <Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }}>*/}
      {/*    View more...*/}
      {/*  </Anchor>*/}
      {/*</Group>*/}
      <SimpleGrid cols={3}>{items}</SimpleGrid>
      {/*<UiDebug data={{ identities, page }} open />*/}
    </Card>
  )
}
