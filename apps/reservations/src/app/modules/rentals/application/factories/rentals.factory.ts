import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { RentalEntity } from '@rental-system/domain';
import { AggregateId, IEntityFactory } from '@rental-system/common';

@Injectable()
export class RentalsFactory implements IEntityFactory<RentalEntity> {
  constructor(private readonly config: ConfigService) {}

  create(data: ICreateRentalInput) {
    return new RentalEntity(new AggregateId(uuidv4()));
  }
}
