import { AggregateId } from '@rental-system/common';

export class IdentifiableModelMock {
  constructor(public id: AggregateId) {}

  async destroy() {
    return null;
  }
}
