import { Logger, UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, ApiAuthService, AuthChallengeRequest, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { User } from '@pubkeyapp/api/user/data-access'

@Resolver()
export class ApiAuthResolver {
  private readonly logger = new Logger(ApiAuthResolver.name)
  constructor(private readonly service: ApiAuthService) {}

  @Mutation(() => Boolean, { nullable: true })
  async userLogout(@Context() context) {
    this.service.resetCookie(context.req, context.res)
    return true
  }

  @Query(() => User, { nullable: true })
  @UseGuards(ApiAuthGraphqlGuard)
  getMe(@CtxUser() user: User) {
    return user
  }

  @Query(() => AuthChallengeRequest, { nullable: true })
  anonRequestChallenge(@Args('publicKey') publicKey: string) {
    this.logger.debug(`requestChallenge: ${publicKey}`)
    return this.service.requestChallenge(publicKey)
  }

  @Mutation(() => User, { nullable: true })
  anonRespondChallenge(
    @Context() ctx,
    @Args('challenge') challenge: string,
    @Args('publicKey') publicKey: string,
    @Args('signature') signature: string,
  ) {
    this.logger.debug(`respondChallenge: ${challenge} ${publicKey} ${signature}`)
    return this.service.responseChallenge(ctx.req, ctx.res, {
      challenge,
      publicKey,
      signature,
    })
  }
}
