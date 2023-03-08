import { registerEnumType } from '@nestjs/graphql'
import { AccountType } from '@prisma/client'
export { AccountType }

registerEnumType(AccountType, { name: 'AccountType' })
