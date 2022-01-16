import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserRestAuthenticationGuard extends AuthGuard('jwt') {}
