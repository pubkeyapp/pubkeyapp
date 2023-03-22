import { Accordion, createStyles, Group, Text } from '@mantine/core'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/notifications'

import { GumProfileCard } from './gum-profile-card'
import { GumProfileCreateButton } from './gum-profile-create-button'
import { GumProfile, gumProfileTypes, GumUser, Namespace } from './gum-interfaces'
import { GumProfileTypeIcon, useGumApp } from './use-gum-app'

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderRadius: theme.radius.xl,
  },

  item: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderRadius: theme.radius.xl,
    border: '4px solid transparent',
    position: 'relative',
    zIndex: 0,
    transition: 'transform 150ms ease',

    '&[data-active]': {
      transform: 'scale(1.03)',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      boxShadow: theme.shadows.md,
      borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
      borderRadius: theme.radius.xl,
      zIndex: 1,
    },
  },

  chevron: {
    '&[data-rotate]': {
      transform: 'rotate(-90deg)',
    },
  },
}))

export function GumProfileList({ user }: { user: GumUser }) {
  const { classes } = useStyles()
  const profiles = user?.profiles || []
  const { createProfile, refresh } = useGumApp()
  const getProfileByNamespace = (namespace: Namespace): GumProfile | undefined => {
    return profiles.find((profile) => profile.name.toLowerCase() === namespace.toLowerCase())
  }

  return (
    <Accordion
      mx="auto"
      variant="filled"
      defaultValue={gumProfileTypes[0].id}
      classNames={classes}
      className={classes.root}
    >
      {gumProfileTypes.map((profileType) => {
        const prof = getProfileByNamespace(profileType.id)
        return (
          <Accordion.Item value={profileType.id} key={profileType.id}>
            <Accordion.Control>
              <Group>
                <GumProfileTypeIcon type={profileType.id} size={32} color={prof ? undefined : 'gray'} />
                <Text color={prof ? undefined : 'dimmed'}>{profileType.id}</Text>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              {prof ? (
                <GumProfileCard profile={prof} user={user} />
              ) : (
                <Group position="center" mb={'md'}>
                  <GumProfileCreateButton
                    type={profileType.id}
                    onClick={() => {
                      const url = prompt(
                        'Enter the URL of the profile you want to create',
                        'https://gist.githubusercontent.com/beeman/27f08d1d772a42e5f75f965faf8bb366/raw/profile.json',
                      )
                      if (!url) return
                      createProfile(profileType.id, user.publicKey, url)
                        .then(() => refresh())
                        .then(() => showNotificationSuccess('Post Created'))
                        .catch(() => showNotificationError('Post Creation Failed'))
                    }}
                  />
                </Group>
              )}
            </Accordion.Panel>
          </Accordion.Item>
        )
      })}
    </Accordion>
  )
}
