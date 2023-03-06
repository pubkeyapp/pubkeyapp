import { registerEnumType } from '@nestjs/graphql'
import { PageBlockType } from '@prisma/client'

export { PageBlockType }

registerEnumType(PageBlockType, { name: 'PageBlockType' })
