export class AggregateId {
  constructor(private readonly value: string) {}

  toString(): string {
    return this.value;
  }
}
