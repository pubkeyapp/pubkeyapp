import { ActionIcon, Tooltip } from '@mantine/core'
import { MantineNumberSize } from '@mantine/styles'
import React, { ComponentType } from 'react'

export function UiActionIcon({
  label,
  color = 'brand',
  loading = false,
  icon: Icon,
  onClick,
  size,
  iconSize = 16,
}: {
  label: string
  color?: string
  loading?: boolean
  icon: ComponentType<{ size: number }>
  onClick: () => void
  size?: MantineNumberSize
  iconSize?: number
}) {
  return (
    <Tooltip label={label}>
      <ActionIcon color={color} onClick={onClick} loading={loading} size={size}>
        <Icon size={iconSize} />
      </ActionIcon>
    </Tooltip>
  )
}
