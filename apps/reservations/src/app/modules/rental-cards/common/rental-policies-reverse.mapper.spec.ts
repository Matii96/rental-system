import { OpenRentalPolicy, RentalPolicies } from '@rental-system/domain';
import { rentalPoliciesReverseMapper } from './rental-policies-reverse.mapper';

describe('rentalPoliciesReverseMapper', () => {
  it('should map policy to enum', () => {
    expect(rentalPoliciesReverseMapper(new OpenRentalPolicy({ countLimit: 0 }))).toEqual(RentalPolicies.OPEN);
  });
});
