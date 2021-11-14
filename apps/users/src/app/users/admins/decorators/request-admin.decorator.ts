import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAdminRequest } from '../interfaces/admin-request.interface';

export const RequestAdmin = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => ctx.switchToHttp().getRequest<IAdminRequest>().admin
);
