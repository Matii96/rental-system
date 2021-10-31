import { ExceptionFilter, Catch, HttpException, Logger, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   *
   * @param {HttpException} exception
   * @param {ArgumentsHost} host
   */
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const data = exception.getResponse();
    const logger = new Logger('HttpException');
    logger.warn(data);

    response.status(exception.getStatus()).send(data);
  }
}
