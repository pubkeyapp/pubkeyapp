import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandTelegram,
  IconBrandTwitter,
  IconExternalLink,
  IconQuestionMark,
} from '@tabler//icons-react'
import React, { ReactElement } from 'react'

export enum PageBlockIconType {
  link = 'link',
  github = 'github',
  twitter = 'twitter',
  discord = 'discord',
  telegram = 'telegram',
}
export interface PageBlockIcon {
  type: PageBlockIconType
  icon: ReactElement
  link: string
  label: string
}

export const pageBlockIcons: PageBlockIcon[] = [
  { type: PageBlockIconType.link, label: 'Link', link: 'https://', icon: <IconExternalLink /> },
  { type: PageBlockIconType.github, label: 'GitHub', link: 'https://github.com/', icon: <IconBrandGithub /> },
  { type: PageBlockIconType.discord, label: 'Discord', link: 'https://discord.com/', icon: <IconBrandDiscord /> },
  { type: PageBlockIconType.twitter, label: 'Twitter', link: 'https://twitter.com/', icon: <IconBrandTwitter /> },
  { type: PageBlockIconType.telegram, label: 'Telegram', link: 'https://telegram.com/', icon: <IconBrandTelegram /> },
]

export function PageBlockIcon({ type }: { type: PageBlockIconType }) {
  const found = pageBlockIcons.find((icon) => icon.type === type)

  if (!found) {
    return <IconQuestionMark />
  }

  return found.icon
}
