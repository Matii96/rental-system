import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InvalidContextTypeException } from '@rental-system/common';
import { IUser } from '@rental-system/domain';
import { IAdminRequest } from '../interfaces/admin-request.interface';
import { AdminsRepository } from '../repositories/admins.repository';

@Injectable()
export class AdminsGuard implements CanActivate {
  constructor(private readonly repository: AdminsRepository) {}

  private checkAccess(user: IUser, userId: string) {
    return this.repository.findById(userId);
  }

  async canActivate(context: ExecutionContext) {
    switch (context.getType()) {
      case 'http':
        const req = context.switchToHttp().getRequest<IAdminRequest>();
        req.admin = await this.checkAccess(req.user, req.params.userId);
        break;
      default:
        throw new InvalidContextTypeException(context.getType());
    }

    return true;
  }
}
