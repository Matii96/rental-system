import { Logger, NestInterceptor, ExecutionContext, CallHandler, Injectable } from '@nestjs/common';
import { catchError } from 'rxjs';
import { ClassOf, DomainException } from '@rental-system/common';

@Injectable()
export class DomainExceptionInterceptor implements NestInterceptor {
  private readonly logger = new Logger(DomainExceptionInterceptor.name);

  /**
   * Converts domain exceptions to defined in handledExceptions
   * @example new DomainExceptionInterceptor({ [InvalidLoginException.name]: UnauthorizedException }, InternalServerErrorException)
   * @param handledExceptions
   * @param fallbackException
   */
  constructor(
    private readonly handledExceptions: { [name: string]: ClassOf<Error> },
    private readonly fallbackException: ClassOf<Error>
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
