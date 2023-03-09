import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'

@Injectable()
export class ApiPublicProfileService {
  constructor(readonly core: ApiCoreService) {}
}
