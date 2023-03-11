import { Accordion, Badge, Box, Button, Group, Stack, Tooltip } from '@mantine/core'
import { useUserProfiles } from '@pubkeyapp/web/profile/data-access'
import { ProfileCreateButton, ProfileTypeBadge } from '@pubkeyapp/web/profile/ui'
import { UiLoader, useAccordionStyles } from '@pubkeyapp/web/ui/core'
import { ProfileType } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { UserManageProfileDetails } from './user-manage-profile.details'

export function UserManageProfiles() {
  const { classes } = useAccordionStyles()
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
            defaultValue={items.length ? undefined : types[0]}
            classNames={classes}
            className={classes.root}
          >
            {types.map((type) => {
              const found = items?.find((p) => p.type === type)
              return (
                <Accordion.Item value={type} key={type}>
                  <Accordion.Control>
                    <Group align="center">
                      <ProfileTypeBadge profileType={type} />
                      {found?.owner?.profile?.type === type ? (
                        <Tooltip label="Your default profile is your main identity on PubKey">
                          <Badge>Default Profile</Badge>
                        </Tooltip>
                      ) : null}
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
        )}
      </Box>
    </Stack>
  )
}
