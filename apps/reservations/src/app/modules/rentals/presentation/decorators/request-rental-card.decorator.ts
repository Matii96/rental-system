import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRentalRequest } from '../interfaces/rental-card-request.interface';

export const RequestRental = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => ctx.switchToHttp().getRequest<IRentalRequest>().rental
);
