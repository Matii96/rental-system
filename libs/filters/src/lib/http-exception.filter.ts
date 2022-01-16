import {
  ExceptionFilter,
  Catch,
  HttpException,
  Logger,
  ArgumentsHost,
  ContextType,
  ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { InvalidContextTypeException } from '@rental-system/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    const hostType: ContextType | 'graphql' = host.getType();
    switch (hostType) {
      case 'http':
        this.handleRest(exception, host);
        break;
      case 'graphql':
        this.handleGql(exception, host);
        break;
      default:
        throw new InvalidContextTypeException(hostType);
    }
  }

  private handleRest(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const data = <Record<string, unknown>>exception.getResponse();

    this.logger.warn({ method: req.method, path: req.url, ...data, body: req.body });
    res.status(exception.getStatus()).send(data);
  }

  private handleGql(exception: HttpException, host: ArgumentsHost) {
    const req: Request = GqlExecutionContext.create(<ExecutionContext>host).getContext().req;
    const data = <Record<string, unknown>>exception.getResponse();
    req.body.query = req.body.query.replace(/\n/g, ' ').replace(/\s+/g, ' ').replace(/\s$/, '');

    this.logger.warn({ method: 'GRAPHQL', ...data, body: req.body });
  }
}
