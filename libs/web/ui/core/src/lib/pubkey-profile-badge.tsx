import { Badge, BadgeProps, Box, Tooltip } from '@mantine/core'
import { PubKeyLogoRounded } from '@pubkeyapp/logo'
import { User } from '@pubkeyapp/web/util/sdk'
import React from 'react'

export interface PubKeyProfileBadgeProps extends BadgeProps {
  label?: string
  tooltip?: string
  component?: any
  user?: User
  onClick?: () => void
}

export function PubKeyProfileBadge({ component, label, tooltip, user, ...props }: PubKeyProfileBadgeProps) {
  return (
    <Tooltip label={tooltip ? tooltip : `PubKey Profile: ${user?.username}#${user?.pid}`} position="top" withArrow>
      <Badge
        {...props}
        onClick={props.onClick}
        color="brand"
        size="lg"
        pl={0}
        leftSection={
          <Box w={32} h={32} pt={4} pl={0}>
            <PubKeyLogoRounded size={24} style={{ borderRadius: 50 }} />
          </Box>
        }
      >
        {label ? label : `${user?.username}#${user?.pid}`}
      </Badge>
    </Tooltip>
  )
}
