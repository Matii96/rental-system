import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AggregateId, InvalidContextTypeException } from '@rental-system/common';
import { IUser } from '@rental-system/domain';
import { RentalCardsRepository } from '../../infrastructure/database/repositories/rental-cards.repository';
import { IRentalCardRequest } from '../interfaces/rental-card-request.interface';

@Injectable()
export class RentalCardGuard implements CanActivate {
  constructor(private readonly repository: RentalCardsRepository) {}

  private getRentalCard(user: IUser, rentalCardId: AggregateId) {
    return this.repository.findById(rentalCardId);
  }

  async canActivate(context: ExecutionContext) {
    switch (context.getType()) {
      case 'http':
        const req = context.switchToHttp().getRequest<IRentalCardRequest>();
        req.rentalCard = await this.getRentalCard(req.user, new AggregateId(req.params.rentalCardId));
        break;
      default:
        throw new InvalidContextTypeException(context.getType());
    }

    return true;
  }
}
