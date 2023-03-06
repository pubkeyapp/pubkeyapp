import { ActionIcon, Button } from '@mantine/core'
import { IconArrowLeft, IconPlus } from '@tabler/icons-react'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function UiBackButton() {
  return (
    <ActionIcon component={Link} to=".." size="xs">
      <IconArrowLeft size={16} />
    </ActionIcon>
  )
}

export function UiActionLink({
  icon,
  label,

  to,
}: {
  icon?: ReactNode
  label: string
  to: string
}) {
  return (
    <Button component={Link} to={to} size="xs" variant="default" leftIcon={icon}>
      {label}
    </Button>
  )
}
