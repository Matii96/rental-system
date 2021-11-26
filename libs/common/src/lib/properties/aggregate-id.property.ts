export class AggregateId {
  constructor(private readonly id: string) {}

  toString(): string {
    return this.id;
  }
}
