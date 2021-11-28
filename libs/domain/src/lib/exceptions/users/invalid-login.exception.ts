export class InvalidLoginException extends Error {
  constructor() {
    super('Invalid login');
  }
}
