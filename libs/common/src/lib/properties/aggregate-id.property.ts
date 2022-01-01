export class AggregateId {
  constructor(private readonly idValue: string) {}

  isEqual(id: AggregateId) {
    return this.idValue === id.toString();
  }

  toString(): string {
    return this.idValue;
  }
}
