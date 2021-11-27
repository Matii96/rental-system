import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAvailabilityRequest } from '../interfaces/availability-request.interface';

export const RequestAvailability = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => ctx.switchToHttp().getRequest<IAvailabilityRequest>().availability
);
