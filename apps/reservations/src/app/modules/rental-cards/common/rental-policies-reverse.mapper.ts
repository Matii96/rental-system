import { RentalPolicies, RentalPoliciesMapper } from '@rental-system/domain';
import { IRentalPolicy } from 'libs/domain/src/lib/interfaces/reservations/rental-policy.interface';

export const rentalPoliciesReverseMapper = (policy: IRentalPolicy) =>
  <RentalPolicies>(
    Object.keys(RentalPoliciesMapper)[
      Object.values(RentalPoliciesMapper).findIndex((mapperPolicy) => policy instanceof mapperPolicy)
    ]
  );
