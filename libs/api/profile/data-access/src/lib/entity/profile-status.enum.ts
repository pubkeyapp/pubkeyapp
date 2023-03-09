import { registerEnumType } from '@nestjs/graphql'
import { ProfileStatus } from '@prisma/client'

export { ProfileStatus }

registerEnumType(ProfileStatus, { name: 'ProfileStatus' })
