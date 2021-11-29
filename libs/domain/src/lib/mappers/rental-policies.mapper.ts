import { RentalPolicies } from '../enums/rental-policies.enum';
import { OpenRentalPolicy } from '../value-objects/rental-policies/open.rental-policy';
import { CountLimitRentalPolicy } from '../value-objects/rental-policies/count-limit.rental-policy';
import { NoWeekendRentalPolicy } from '../value-objects/rental-policies/no-weekend.rental-policy';

export const RentalPoliciesMapper = {
  [RentalPolicies.OPEN]: OpenRentalPolicy,
  [RentalPolicies.COUNT_LIMIT]: CountLimitRentalPolicy,
  [RentalPolicies.NO_WEEKEND]: NoWeekendRentalPolicy,
};
