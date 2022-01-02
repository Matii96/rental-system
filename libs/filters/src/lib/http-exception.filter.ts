import { ExceptionFilter, Catch, HttpException, Logger, ArgumentsHost } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const data = <Record<string, unknown>>exception.getResponse();
    this.logger.warn({ path: request.url, ...data, body: request.body });

    response.status(exception.getStatus()).send(data);
  }
}
