import { User, UserRole } from '@prisma/client'
import { APIEmbedField, EmbedBuilder, User as DiscordUser } from 'discord.js'

export function formatUserEmbed(owner: User) {
  const name = owner?.username
  const role = owner.role

  return fieldsMessage(owner.username, [
    { name: 'ID', value: owner.id },
    {
      name: 'Name',
      value: `${name} ${owner.role === UserRole.Admin ? '(**Admin**)' : ''}`,
    },
    { name: 'Role', value: role },
  ])
}

export function setupUrl(client: string, permissions: string) {
  return `https://discord.com/api/oauth2/authorize?client_id=${client}&permissions=${permissions}&scope=applications.commands%20bot`
}

export function format(value = 1, decimals = 0) {
  return (value / Math.pow(10, decimals)).toFixed(decimals)
}

export function fieldsMessage(title: string, fields: APIEmbedField[]) {
  return new EmbedBuilder().setTitle(title).addFields(
    fields.map(({ inline, name, value }) => ({
      inline: inline || false,
      name,
      value,
    })),
  )
}

export function unknownUser(user: DiscordUser, subject?: DiscordUser) {
  return `${user} I don't think ${subject ? subject + ' and I' : 'we'} have met before.`
}
