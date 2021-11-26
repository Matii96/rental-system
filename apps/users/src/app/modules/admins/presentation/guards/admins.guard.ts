import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AggregateId, InvalidContextTypeException } from '@rental-system/common';
import { IUser } from '@rental-system/domain';
import { IUserRequest } from '../../../users/presentation/interfaces/user-request.interface';
import { AdminsRepository } from '../../infrastructure/database/repositories/admins.repository';

@Injectable()
export class AdminsGuard implements CanActivate {
  constructor(private readonly repository: AdminsRepository) {}

  private getUser(user: IUser, userId: AggregateId) {
    return this.repository.findById(userId);
  }

  async canActivate(context: ExecutionContext) {
    switch (context.getType()) {
      case 'http':
        const req = context.switchToHttp().getRequest<IUserRequest>();
        req.requestUser = await this.getUser(req.user, new AggregateId(req.params.userId));
        break;
      default:
        throw new InvalidContextTypeException(context.getType());
    }

    return true;
  }
}
