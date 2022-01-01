import { IMicroserviceQuery } from '../../interfaces/query.interface';

export class RentalCardGetByIdQueryPattern implements IMicroserviceQuery {
  readonly query = 'GET_RENTAL_CARD_BY_ID';
}
