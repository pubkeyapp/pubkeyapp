import { Accordion, Box, Group, Stack } from '@mantine/core'
import { ProfileCreateButton, ProfileTypeBadge } from '@pubkeyapp/web/profile/ui'
import { useAccordionStyles } from '@pubkeyapp/web/ui/core'
import { Profile, ProfileType } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { UserManageProfileDetails } from './user-manage-profile.details'

export function UserManageProfiles({ profiles }: { profiles: Profile[] }) {
  const { classes } = useAccordionStyles()
  const types = [ProfileType.Personal, ProfileType.Professional, ProfileType.Gaming, ProfileType.Degen]

  return (
    <Stack spacing="xl">
      <Box>
        <Accordion mx="auto" variant="filled" defaultValue={types[0]} classNames={classes} className={classes.root}>
          {types.map((type) => {
            const found = profiles.find((p) => p.type === type)
            return (
              <Accordion.Item value={type} key={type}>
                <Accordion.Control>
                  <Group align="center">
                    <ProfileTypeBadge profileType={type} />
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <Box>
                    {found ? (
                      <UserManageProfileDetails profile={found} />
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
      </Box>
    </Stack>
  )
}
