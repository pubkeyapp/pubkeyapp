import { ApiAuthService, ApiAuthGraphqlGuard, AuthChallengeRequest, CtxUser } from '@pubkeyapp/api/auth/data-access'
import { User } from '@pubkeyapp/api/user/data-access'
import { Logger, UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class ApiAuthFeatureResolver {
  private readonly logger = new Logger(ApiAuthFeatureResolver.name)
  constructor(private readonly service: ApiAuthService) {}

  @Mutation(() => Boolean, { nullable: true })
  async logout(@Context() context) {
    this.service.resetCookie(context.req, context.res)
    return true
  }

  @Query(() => User, { nullable: true })
  @UseGuards(ApiAuthGraphqlGuard)
  me(@CtxUser() user: User) {
    this.logger.debug(`me: ${user?.username}`)
    return user
  }

  @Query(() => AuthChallengeRequest, { nullable: true })
  requestChallenge(@Args('publicKey') publicKey: string) {
    this.logger.debug(`requestChallenge: ${publicKey}`)
    return this.service.requestChallenge(publicKey)
  }

  @Mutation(() => User, { nullable: true })
  respondChallenge(
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
