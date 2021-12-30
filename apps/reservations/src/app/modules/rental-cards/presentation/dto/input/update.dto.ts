import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { IUpdateRentalCardInput } from '@rental-system/interfaces';
import { RentalPolicies } from '@rental-system/domain';

export class RentalCardUpdateDto implements IUpdateRentalCardInput {
  @ApiProperty({ example: Object.keys(RentalPolicies)[0] })
  @IsEnum(RentalPolicies)
  rentalPolicyType: RentalPolicies;
}
