import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClassOf, instanceOfMixin, InvalidContextTypeException, Mixin } from '@rental-system/common';
import { IUser } from '@rental-system/domain';
import { AuthMetadata } from '../enums/metadata.enum';
import { IAuthenticatedRequest } from '../interfaces/authenticated-request.interface';

@Injectable()
export class UserAuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  private checkAccess(user: IUser, allowed: (ClassOf<IUser> | Mixin)[]) {
    if (allowed.length === 0) {
      return true;
    }

    for (const allow of allowed) {
      try {
        if (user instanceof allow) return true;
      } catch (err) {
        if (instanceOfMixin(user, <Mixin>allow)) return true;
      }
    }
    return false;
  }

  canActivate(context: ExecutionContext) {
    const allowed = this.reflector.get<(ClassOf<IUser> | Mixin)[]>(AuthMetadata.AUTH_ALLOWED, context.getHandler());
    switch (context.getType()) {
      case 'http':
        const req = context.switchToHttp().getRequest<IAuthenticatedRequest>();
        return this.checkAccess(req.user, allowed);
      default:
        throw new InvalidContextTypeException(context.getType());
    }
  }
}
