import { CanActivate, ContextType, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
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
    const contextType: ContextType | 'graphql' = context.getType();
    const allowed = this.reflector.get<(ClassOf<IUser> | Mixin)[]>(AuthMetadata.AUTH_ALLOWED, context.getHandler());

    let req: IAuthenticatedRequest;
    switch (contextType) {
      case 'http':
        req = context.switchToHttp().getRequest();
        return this.checkAccess(req.user, allowed);
      case 'graphql':
        req = GqlExecutionContext.create(context).getContext().req;
        return this.checkAccess(req.user, allowed);
      default:
        throw new InvalidContextTypeException(contextType);
    }
  }
}
