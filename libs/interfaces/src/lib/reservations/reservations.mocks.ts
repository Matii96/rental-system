import { v4 as uuidv4 } from 'uuid';
import { RentalPolicies } from '@rental-system/domain';
import { IRentalCardOutput } from './output/rental-card-output.interface';

export const rentalCardOutputMock = (): IRentalCardOutput => {
  const rentalPolicyTypes = <RentalPolicies[]>Object.keys(RentalPolicies);
  return {
    id: uuidv4(),
    ownerId: uuidv4(),
    rentalPolicyType: rentalPolicyTypes[Math.floor(Math.random() * rentalPolicyTypes.length)],
  };
};
