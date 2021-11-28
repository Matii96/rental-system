export class NoItemToReturnException extends Error {
  constructor() {
    super('No item to return');
  }
}
