import { Button, Card, createStyles, rem, SimpleGrid, Stack, Text, Tooltip } from '@mantine/core'
import { Identity, IdentityProvider } from '@pubkeyapp/web/util/sdk'
import { IconPlus } from '@tabler/icons-react'
import React, { ReactNode } from 'react'
import { IdentityProviderAvatar } from './identity-provider-avatar'

const useStyles = createStyles((theme) => ({
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: rem(172),
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',
    '&:hover': {
      boxShadow: theme.shadows.md,
      transform: 'scale(1.05)',
    },
  },
}))

export function IdentityGrid({
  addIdentity,
  selectIdentity,
  identities,
}: {
  addIdentity?: () => void
  selectIdentity: (item: Identity) => void
  identities: Identity[]
}) {
  const items = identities.map((item) => {
    return (
      <IdentityGridItem
        key={item.id}
        tooltip={`${item.provider}`}
        icon={<IdentityProviderAvatar size={64} provider={item.provider as IdentityProvider} />}
        text={`${item.provider}`}
        onClick={() => selectIdentity(item)}
      />
    )
  })
  return (
    <Card withBorder={false} radius="lg">
      <SimpleGrid cols={3}>
        {addIdentity ? (
          <IdentityGridItem
            text={'Link Identity'}
            tooltip={`Link an Identity to this profile `}
            onClick={addIdentity}
            icon={<IconPlus size={64} />}
          />
        ) : null}
        {items}
      </SimpleGrid>
    </Card>
  )
}

export function IdentityGridItem({
  text,
  icon,
  tooltip,
  onClick,
}: {
  icon: ReactNode
  text: string
  tooltip: string
  onClick: () => void
}) {
  const { classes } = useStyles()
  return (
    <Tooltip label={tooltip}>
      <Button color="brand" variant="subtle" className={classes.item} onClick={onClick}>
        <Stack spacing={4} align="center">
          {icon}
          <Text size="lg" mt={7}>
            {text}
          </Text>
        </Stack>
      </Button>
    </Tooltip>
  )
}
