import { registerEnumType } from '@nestjs/graphql'
import { PageStatus } from '@prisma/client'

export { PageStatus }

registerEnumType(PageStatus, { name: 'PageStatus' })
