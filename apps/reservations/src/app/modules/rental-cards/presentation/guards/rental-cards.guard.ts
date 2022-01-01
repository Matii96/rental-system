import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { AggregateId, InvalidContextTypeException } from '@rental-system/common';
import { IUser, UserAdminEntity } from '@rental-system/domain';
import { RentalCardsRepository } from '../../infrastructure/database/repositories/rental-cards.repository';
import { IRentalCardRequest } from '../interfaces/rental-card-request.interface';

@Injectable()
export class RentalCardGuard implements CanActivate {
  constructor(private readonly repository: RentalCardsRepository) {}

  private async getRentalCard(user: IUser, rentalCardId: AggregateId) {
    const card = await this.repository.findById(rentalCardId);

    if (user instanceof UserAdminEntity) {
      return card;
    }
    if (!user.id.isEqual(card.ownerId)) {
      throw new ForbiddenException();
    }

    return card;
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
