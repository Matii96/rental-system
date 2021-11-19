import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserRequest } from '../interfaces/user-request.interface';

export const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => ctx.switchToHttp().getRequest<IUserRequest>().requestUser
);
