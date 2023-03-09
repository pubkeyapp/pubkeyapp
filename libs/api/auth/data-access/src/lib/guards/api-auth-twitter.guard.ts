import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class ApiAuthTwitterGuard extends AuthGuard('twitter') {}
