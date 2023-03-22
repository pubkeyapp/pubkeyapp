import { Badge, BadgeProps, Box, Text, ThemeIcon, Tooltip } from '@mantine/core'
import { PubKeyLogoRounded } from '@pubkeyapp/logo'
import { User } from '@pubkeyapp/web/util/sdk'
import { IconDiscountCheck } from '@tabler/icons-react'
import { UserVerifiedModal } from './user-verified.modal'

export interface PubKeyProfileBadgeProps extends BadgeProps {
  label?: string
  tooltip?: string
  component?: any
  user?: User
  onClick?: () => void
}

export function UserProfileBadge({ component, label, tooltip, user, ...props }: PubKeyProfileBadgeProps) {
  const badge = (
    <Badge
      {...props}
      onClick={props.onClick}
      color="brand"
      size="lg"
      pl={0}
      pr={user?.gumUser ? 6 : 0}
      leftSection={
        <Box w={32} h={32} pt={4} pl={0}>
          <PubKeyLogoRounded size={24} style={{ borderRadius: 50 }} />
        </Box>
      }
      rightSection={
        user?.gumUser ? (
          <UserVerifiedModal user={user} />
        ) : (
          <ThemeIcon variant="transparent" size="lg" radius="xl">
            <Text color={'dimmed'} sx={{ display: 'flex' }}>
              {<IconDiscountCheck size={16} />}
            </Text>
          </ThemeIcon>
        )
      }
    >
      {label ? label : `${user?.username}#${user?.pid}`}
    </Badge>
  )
  return tooltip ? (
    <Tooltip label={tooltip} position="top" withArrow>
      {badge}
    </Tooltip>
  ) : (
    badge
  )
}
