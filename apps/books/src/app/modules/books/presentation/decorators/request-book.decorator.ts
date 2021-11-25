import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IBookRequest } from '../interfaces/user-request.interface';

export const RequestBook = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => ctx.switchToHttp().getRequest<IBookRequest>().book
);
