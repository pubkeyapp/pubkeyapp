import { registerEnumType } from '@nestjs/graphql'

export enum AccountQueue {
  AccountDiscover = 'AccountDiscover',
}

registerEnumType(AccountQueue, { name: 'AccountQueue' })
