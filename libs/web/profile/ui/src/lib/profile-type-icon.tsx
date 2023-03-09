import { Badge, BadgeProps, Button, ButtonProps, ThemeIcon, Tooltip, useMantineTheme } from '@mantine/core'
import { ProfileType } from '@pubkeyapp/web/util/sdk'
import { IconBuildingBank, IconDeviceGamepad, IconPigMoney, IconQuestionMark, IconUser } from '@tabler/icons-react'
import React from 'react'

export function getProfileTypeColor(type: ProfileType | string): string {
  switch (type) {
    case ProfileType.Professional:
      return 'blue'
    case ProfileType.Personal:
      return 'green'
    case ProfileType.Gaming:
      return 'yellow'
    case ProfileType.Degen:
      return 'red'
    default:
      return 'gray'
  }
}
export function ProfileTypeIcon({
  size = 16,
  type,
  color,
}: {
  size?: number
  type: ProfileType | string
  color?: string
}) {
  const theme = useMantineTheme()
  color = color ?? theme.colors[getProfileTypeColor(type)][6]
  switch (type) {
    case ProfileType.Professional:
      return <IconBuildingBank size={size} color={color} />
    case ProfileType.Personal:
      return <IconUser size={size} color={color} />
    case ProfileType.Gaming:
      return <IconDeviceGamepad size={size} color={color} />
    case ProfileType.Degen:
      return <IconPigMoney size={size} color={color} />
    default:
      return <IconQuestionMark size={size} color={color} />
  }
}

export interface ProfileTypeButtonProps extends ButtonProps {
  component?: any
  pageType: ProfileType | string
  onClick?: () => void
}

export function ProfileTypeButton({ pageType, component, ...props }: ProfileTypeButtonProps) {
  const theme = useMantineTheme()
  const color = props.color ?? theme.colors[getProfileTypeColor(pageType)][6]

  return (
    <Button {...props} onClick={props.onClick}>
      {pageType}
    </Button>
  )
}

export interface ProfileTypeBadgeProps extends BadgeProps {
  component?: any
  profileType: ProfileType | string
  onClick?: () => void
}

export function ProfileTypeBadge({ profileType, component, ...props }: ProfileTypeBadgeProps) {
  const color = getProfileTypeColor(profileType)

  return (
    <Tooltip label={`${profileType} profile`} position="right" withArrow>
      <Badge
        {...props}
        onClick={props.onClick}
        color={color}
        size="lg"
        pl={0}
        leftSection={
          <ThemeIcon color={color} variant="transparent" size="lg" radius="xl">
            <ProfileTypeIcon type={profileType} />
          </ThemeIcon>
        }
      >
        {profileType}
      </Badge>
    </Tooltip>
  )
}
