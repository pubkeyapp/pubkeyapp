import { ActionIcon, Anchor, Box, createStyles, Group, Modal, Stack, Text } from '@mantine/core'
import { Page } from '@pubkeyapp/sdk'
import {
  IconAt,
  IconBrandFacebook,
  IconBrandTelegram,
  IconBrandTwitter,
  IconBrandWhatsapp,
  IconChevronRight,
  IconShare,
} from '@tabler//icons-react'
import React, { ReactElement, useState } from 'react'

import { PageShareCopyButton } from './page-share-copy-button'

export const useStyles = createStyles((theme) => ({
  shareItem: {
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    },
  },
}))

export function PageShareModal({ page }: { page: Page }) {
  const { classes } = useStyles()
  const [opened, setOpened] = useState(false)
  const text = `Check out this page on PubKey: ${page.viewUrl}`
  const links: { icon: ReactElement; label: string; link: string }[] = [
    {
      icon: <IconBrandTwitter size={36} />,
      label: 'Share on Twitter',
      link: `https://twitter.com/intent/tweet?text=${text}`,
    },
    {
      icon: <IconBrandFacebook size={36} />,
      label: 'Share on Facebook',
      link: `https://www.facebook.com/sharer/sharer.php?u=${page.viewUrl}`,
    },
    {
      icon: <IconBrandWhatsapp size={36} />,
      label: 'Share on WhatsApp',
      link: `https://wa.me/?text=${text}`,
    },
    {
      icon: <IconBrandTelegram size={36} />,
      label: 'Share on Telegram',
      link: `https://t.me/share/url?url=${page.viewUrl}&text=${text}`,
    },
    {
      icon: <IconAt size={36} />,
      label: 'Share via Email',
      link: `mailto:?subject=Check out this PubKey!&body=${text}`,
    },
  ]
  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title={<Text size="xl">Share this PubKey</Text>} centered>
        {page.viewUrl ? (
          <Stack mt={48}>
            {links.map((link) => (
              <Anchor
                key={link.label}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.shareItem}
                py="xl"
                px="md"
              >
                <Group position="apart">
                  <Group spacing="xl">
                    {link.icon}
                    <Text size="xl">{link.label}</Text>
                  </Group>
                  <IconChevronRight size={36} />
                </Group>
              </Anchor>
            ))}
            <Box py="xl" px="md">
              <PageShareCopyButton page={page} />
            </Box>
          </Stack>
        ) : (
          <Text>Sorry, this page is not published yet.</Text>
        )}
      </Modal>
      <ActionIcon variant="light" color="brand" onClick={() => setOpened(true)}>
        <IconShare size={16} />
      </ActionIcon>
    </>
  )
}
