import { v4 as uuidv4 } from 'uuid';

export class AggregateId {
  constructor(private readonly idValue = uuidv4()) {}

  isEqual(id: AggregateId) {
    return this.idValue === id.toString();
  }

  toString(): string {
    return this.idValue;
  }
}
