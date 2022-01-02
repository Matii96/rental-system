import { Logger, NestInterceptor, ExecutionContext, CallHandler, Injectable } from '@nestjs/common';
import { catchError } from 'rxjs';
import { DomainException } from '@rental-system/common';

@Injectable()
export class DomainExceptionInterceptor implements NestInterceptor {
  private readonly logger = new Logger(DomainExceptionInterceptor.name);

  constructor(
    private readonly handledExceptions: { [name: string]: { new (msg?: string): Error } },
    private readonly fallbackException: { new (msg?: string): Error }
  ) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(catchError(this.handle.bind(this)));
  }

  private handle(exception: Error) {
    if (!(exception instanceof DomainException)) {
      throw exception;
    }

    this.logger.warn(exception.message);
    if (this.handledExceptions[exception.constructor.name]) {
      throw new this.handledExceptions[exception.constructor.name](exception.message);
    }
    throw new this.fallbackException();
  }
}
