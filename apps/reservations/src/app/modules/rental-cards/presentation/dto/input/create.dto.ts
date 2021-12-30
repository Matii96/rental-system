import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';
import { ICreateRentalCardInput } from '@rental-system/interfaces';
import { RentalPolicies } from '@rental-system/domain';

export class RentalCardCreateInputDto implements ICreateRentalCardInput {
  @ApiProperty()
  @IsUUID()
  ownerId: string;

  @ApiProperty({ example: Object.keys(RentalPolicies)[0] })
  @IsEnum(RentalPolicies)
  rentalPolicyType: RentalPolicies;
}
