import { registerEnumType } from '@nestjs/graphql'
import { ProfileType } from '@prisma/client'

export { ProfileType }

registerEnumType(ProfileType, { name: 'ProfileType' })
