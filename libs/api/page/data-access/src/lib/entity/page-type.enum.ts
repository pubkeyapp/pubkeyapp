import { registerEnumType } from '@nestjs/graphql'
import { PageType } from '@prisma/client'

export { PageType }

registerEnumType(PageType, { name: 'PageType' })
