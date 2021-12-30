import { IRentalPolicy, RentalPolicies, RentalPoliciesMapper } from '@rental-system/domain';

export const rentalPoliciesReverseMapper = (policy: IRentalPolicy) =>
  <RentalPolicies>(
    Object.keys(RentalPoliciesMapper)[
      Object.values(RentalPoliciesMapper).findIndex((mapperPolicy) => policy instanceof mapperPolicy)
    ]
  );
