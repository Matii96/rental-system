export class ConfigValidationError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = ConfigValidationError.name;
  }
}
