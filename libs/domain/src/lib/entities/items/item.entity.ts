import { AggregateId, IIdentifiableEntity } from '@rental-system/common';

export abstract class ItemEntity implements IIdentifiableEntity {
  constructor(
    public readonly id: AggregateId,
    public readonly createdAt: Date,
    public name: string,
    public author: string
  ) {}
}
