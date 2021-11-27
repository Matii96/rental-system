import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AggregateId, InvalidContextTypeException } from '@rental-system/common';
import { IUser } from '@rental-system/domain';
import { AvailabilityRepository } from '../../infrastructure/database/repositories/availability.repository';
import { IAvailabilityRequest } from '../interfaces/availability-request.interface';

@Injectable()
export class AvailabilityGuard implements CanActivate {
  constructor(private readonly repository: AvailabilityRepository) {}

  private getAvailability(user: IUser, availabilityId: AggregateId) {
    return this.repository.findById(availabilityId);
  }

  async canActivate(context: ExecutionContext) {
    switch (context.getType()) {
      case 'http':
        const req = context.switchToHttp().getRequest<IAvailabilityRequest>();
        req.availability = await this.getAvailability(req.user, new AggregateId(req.params.availabilityId));
        break;
      default:
        throw new InvalidContextTypeException(context.getType());
    }

    return true;
  }
}
