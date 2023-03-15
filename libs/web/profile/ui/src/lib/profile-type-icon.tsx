import { Badge, BadgeProps, Button, ButtonProps, Text, ThemeIcon, Tooltip, useMantineTheme } from '@mantine/core'
import { ProfileType } from '@pubkeyapp/web/util/sdk'
import {
  IconBuildingBank,
  IconDeviceGamepad,
  IconDice3,
  IconDiscountCheck,
  IconDiscountCheckFilled,
  IconQuestionMark,
  IconUser,
} from '@tabler/icons-react'

export function getProfileTypeColor(type: ProfileType | string): string {
  switch (type) {
    case ProfileType.Professional:
      return 'violet'
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
      return <IconDice3 size={size} color={color} />
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
  label?: string
  verified?: boolean
  profileType: ProfileType | string
  onClick?: () => void
}

export function ProfileTypeBadge({ profileType, verified, label, component, ...props }: ProfileTypeBadgeProps) {
  const color = getProfileTypeColor(profileType)

  return (
    <Tooltip label={label ?? `${profileType} Gum Profile (${verified ? 'verified' : 'not verified'})`} withArrow>
      <Badge
        {...props}
        onClick={props.onClick}
        color={color}
        size="lg"
        px={0}
        leftSection={
          <ThemeIcon color={color} variant="transparent" size="lg" radius="xl">
            <ProfileTypeIcon type={profileType} />
          </ThemeIcon>
        }
        rightSection={
          <ThemeIcon color={color} variant="transparent" size="lg" radius="xl">
            <Text color={verified ? 'blue' : 'dimmed'} sx={{ display: 'flex' }}>
              {verified ? <IconDiscountCheckFilled size={16} /> : <IconDiscountCheck size={16} />}
            </Text>
          </ThemeIcon>
        }
      >
        {label ?? profileType}
      </Badge>
    </Tooltip>
  )
}
