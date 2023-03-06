import { Button } from '@mantine/core'

import { UserRelation } from '@pubkeyapp/web/util/sdk'

export function UserFollowButtons({ relation, username }: { relation?: UserRelation | null; username: string }) {
  // const { followUser, unfollowUser } = useUser()
  return relation?.isFollowedByYou ? (
    <Button size="xs" variant="default" onClick={() => console.log('unfollowUser => ', username)}>
      Unfollow
    </Button>
  ) : (
    <Button size="xs" variant="default" onClick={() => console.log('followUser => ', username)}>
      Follow
    </Button>
  )
}
