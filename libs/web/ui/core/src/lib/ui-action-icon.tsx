import { ActionIcon, ButtonProps, Tooltip } from '@mantine/core'
import React, { ComponentType } from 'react'

export function UiActionIcon({
  label,
  color = 'brand',
  icon: Icon,
  onClick,
}: {
  label: string
  color?: string
  icon: ComponentType<{ size: number }>
  onClick: () => void
}) {
  return (
    <Tooltip label={label}>
      <ActionIcon color={color} onClick={onClick}>
        <Icon size={16} />
      </ActionIcon>
    </Tooltip>
  )
}
