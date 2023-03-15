import { Accordion, Box, Group, Stack } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { useUserProfiles } from '@pubkeyapp/web/profile/data-access'
import { ProfileCreateButton, ProfileTypeBadge } from '@pubkeyapp/web/profile/ui'
import { PubKeyProfileBadge, UiLoader, useAccordionStyles } from '@pubkeyapp/web/ui/core'
import { ProfileType } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { UserManageProfileDetails } from './user-manage-profile.details'

export function UserManageProfiles({ verifyUser }: { verifyUser: () => void }) {
  const { classes } = useAccordionStyles()
  const { user } = useAuth()
  const { items, loading } = useUserProfiles()

  const types = [ProfileType.Personal, ProfileType.Professional, ProfileType.Gaming, ProfileType.Degen]

  return (
    <Stack spacing="xl">
      <Box>
        {loading && !items?.length ? (
          <UiLoader />
        ) : (
          <Accordion
            mx="auto"
            variant="filled"
            defaultValue={user?.profile?.type ? null : types[0]}
            classNames={classes}
            className={classes.root}
          >
            {types.map((type) => {
              const found = items?.find((p) => p.type === type)
              return (
                <Accordion.Item value={type} key={type}>
                  <Accordion.Control>
                    <Group align="center">
                      <ProfileTypeBadge profileType={type} verified={!!found?.gumProfile} />
                      {found?.owner?.profile?.type === type ? (
                        <PubKeyProfileBadge label="Primary" tooltip="This profile is your primary profile on PubKey" />
                      ) : null}
                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Box>
                      {found ? (
                        <UserManageProfileDetails profile={found} verifyUser={verifyUser} />
                      ) : (
                        <Group position="center">
                          <ProfileCreateButton type={type} />
                        </Group>
                      )}
                    </Box>
                  </Accordion.Panel>
                </Accordion.Item>
              )
            })}
          </Accordion>
        )}
      </Box>
    </Stack>
  )
}
