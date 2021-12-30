import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRentalCardRequest } from '../interfaces/rental-card-request.interface';

export const RequestRentalCard = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => ctx.switchToHttp().getRequest<IRentalCardRequest>().rentalCard
);
