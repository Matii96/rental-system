import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { AggregateId, InvalidContextTypeException } from '@rental-system/common';
import { IUser, UserAdminEntity } from '@rental-system/domain';
import { ReservationsMicroserviceClient } from '@rental-system/microservices';
import { RentalsRepository } from '../../infrastructure/database/repositories/rentals.repository';
import { IRentalRequest } from '../interfaces/rental-card-request.interface';

@Injectable()
export class RentalsGuard implements CanActivate {
  constructor(
    private readonly reservationsClient: ReservationsMicroserviceClient,
    private readonly repository: RentalsRepository
  ) {}

  private async getRental(user: IUser, rentalId: AggregateId) {
    const rental = await this.repository.findById(rentalId);

    if (user instanceof UserAdminEntity) {
      return rental;
    }
    const card = await this.reservationsClient.getCardById(rental.cardId);
    if (!user.id.isEqual(card.ownerId)) {
      throw new ForbiddenException();
    }

    return rental;
  }

  async canActivate(context: ExecutionContext) {
    switch (context.getType()) {
      case 'http':
        const req = context.switchToHttp().getRequest<IRentalRequest>();
        req.rental = await this.getRental(req.user, new AggregateId(req.params.rentalId));
        break;
      default:
        throw new InvalidContextTypeException(context.getType());
    }

    return true;
  }
}
