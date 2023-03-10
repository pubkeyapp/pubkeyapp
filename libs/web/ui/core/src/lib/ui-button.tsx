import { Button, ButtonProps, Tooltip } from '@mantine/core'
import React, { ComponentType } from 'react'

export interface UiButtonProps extends ButtonProps {
  label: string
  tooltip?: string
  icon?: ComponentType<{ size: number }>
  onClick: () => void
}

export function UiButton({ label, tooltip, color = 'brand', icon: Icon, onClick, ...props }: UiButtonProps) {
  const btn: JSX.Element = (
    <Button color={color} onClick={onClick} leftIcon={Icon ? <Icon size={16} /> : undefined} {...props}>
      {label}
    </Button>
  )

  return tooltip ? <Tooltip label={label}>{btn}</Tooltip> : btn
}
