import { Injectable, Logger } from '@nestjs/common'
import { Account, ApiAnonAccountService } from '@pubkeyapp/api/account/data-access'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { User } from '@pubkeyapp/api/user/data-access'
import { UserSearchInput } from './dto/user-search.input'
import { SearchResult } from './entity/search-result.entity'

@Injectable()
export class ApiUserSearchService {
  private readonly logger = new Logger(ApiUserSearchService.name)
  constructor(readonly account: ApiAnonAccountService, readonly core: ApiCoreService) {}

  async userSearch(userId: string, input: UserSearchInput): Promise<SearchResult> {
    if (input.query.length < 3) {
      return { accounts: [], users: [] }
    }
    await this.core.ensureUserActive(userId)
    this.logger.verbose(`Searching for ${input.query}...(user: ${userId})`)

    const [accounts, users] = await Promise.all([this.searchAccounts(input), this.searchUsers(input)])

    return {
      accounts: [...accounts],
      users: [...users],
    }
  }

  private async searchAccounts(input: UserSearchInput): Promise<Account[]> {
    return this.core.data.account.findMany({
      where: {
        OR: [
          //
          { name: { contains: input.query, mode: 'insensitive' } },
          { address: { contains: input.query, mode: 'insensitive' } },
        ],
      },
      include: {
        identity: { include: { owner: { include: { profile: true } } } },
      },
    })
  }
  private async searchUsers(input: UserSearchInput): Promise<User[]> {
    return this.core.data.user.findMany({
      where: {
        OR: [
          // FIXME: make sure we can search on a number (pid)
          // { pid: { contains: input.query, mode: 'insensitive } },
          { username: { contains: input.query, mode: 'insensitive' } },
          { name: { contains: input.query, mode: 'insensitive' } },
          { bio: { contains: input.query, mode: 'insensitive' } },
          // { address: { contains: input.query, }, }
        ],
      },
      include: {
        profile: { include: { owner: true } },
        // identities: { include: { owner: { include: { profile: true } } } },
      },
    })
  }
}
