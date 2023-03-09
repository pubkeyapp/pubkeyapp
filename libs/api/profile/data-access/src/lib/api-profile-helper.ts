import { ProfileType } from './entity/profile-type.enum'

export function getProfileTypeColor(type: ProfileType): string {
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
