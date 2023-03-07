import { useMantineTheme } from '@mantine/core'
import { PageType } from '@pubkeyapp/web/util/sdk'
import { IconBuildingBank, IconDeviceGamepad, IconPigMoney, IconQuestionMark, IconUser } from '@tabler/icons-react'
import React from 'react'

export function PageTypeColor({ type }: { type: PageType | string }): string {
  switch (type) {
    case PageType.Professional:
      return 'blue'
    case PageType.Personal:
      return 'green'
    case PageType.Gaming:
      return 'yellow'
    case PageType.Degen:
      return 'red'
    default:
      return 'gray'
  }
}
export function PageTypeIcon({ size = 16, type, color }: { size?: number; type: PageType | string; color?: string }) {
  const theme = useMantineTheme()
  color = color ?? theme.colors[PageTypeColor({ type })][6]
  switch (type) {
    case PageType.Professional:
      return <IconBuildingBank size={size} color={color} />
    case PageType.Personal:
      return <IconUser size={size} color={color} />
    case PageType.Gaming:
      return <IconDeviceGamepad size={size} color={color} />
    case PageType.Degen:
      return <IconPigMoney size={size} color={color} />
    default:
      return <IconQuestionMark size={size} color={color} />
  }
}
