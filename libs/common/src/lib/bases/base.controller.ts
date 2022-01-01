import { HttpException } from '@nestjs/common';

export class BaseController {
  protected readonly handledExceptions: { [name: string]: { new (msg: string): HttpException } };

  protected transformException(err: Error) {
    if (this.handledExceptions[err.constructor.name]) {
      throw new this.handledExceptions[err.constructor.name](err.message);
    }
    throw err;
  }
}
