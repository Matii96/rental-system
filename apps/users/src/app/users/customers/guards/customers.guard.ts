import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InvalidContextTypeException } from '@rental-system/common';
import { IUser } from '@rental-system/domain';
import { IUserRequest } from '../../interfaces/user-request.interface';
import { CustomersRepository } from '../repositories/customers.repository';

@Injectable()
export class CustomersGuard implements CanActivate {
  constructor(private readonly repository: CustomersRepository) {}

  private getUser(user: IUser, userId: string) {
    return this.repository.findById(userId);
  }

  async canActivate(context: ExecutionContext) {
    switch (context.getType()) {
      case 'http':
        const req = context.switchToHttp().getRequest<IUserRequest>();
        req.requestUser = await this.getUser(req.user, req.params.userId);
        break;
      default:
        throw new InvalidContextTypeException(context.getType());
    }

    return true;
  }
}
