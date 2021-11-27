import { AggregateId } from '@rental-system/common';

export class IdentifiableModelMock {
  id: string;

  constructor(id: AggregateId) {
    this.id = id.toString();
  }

  async destroy() {
    return null;
  }
}
