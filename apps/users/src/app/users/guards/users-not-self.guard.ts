import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InvalidContextTypeException } from '@rental-system/common';
import { IUser } from '@rental-system/domain';
import { IUserRequest } from '../interfaces/user-request.interface';

/**
 * Prevents user from accessing himself
 */
@Injectable()
export class UserNotSelfGuard implements CanActivate {
  private checkAccess(user: IUser, requestUser: IUser) {
    return user.id !== requestUser.id;
  }

  async canActivate(context: ExecutionContext) {
    switch (context.getType()) {
      case 'http':
        const req = context.switchToHttp().getRequest<IUserRequest>();
        return this.checkAccess(req.user, req.requestUser);
      default:
        throw new InvalidContextTypeException(context.getType());
    }
  }
}
