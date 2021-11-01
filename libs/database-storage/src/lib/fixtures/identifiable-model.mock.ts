export class IdentifiableModelMock {
  constructor(public id: string) {}

  async destroy() {
    return null;
  }
}
