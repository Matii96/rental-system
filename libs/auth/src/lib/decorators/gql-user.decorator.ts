import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IAuthenticatedRequest } from '../interfaces/authenticated-request.interface';

export const GqlUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) =>
    (<IAuthenticatedRequest>GqlExecutionContext.create(ctx).getContext().req).user
);
