import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { RentalPolicies } from '@rental-system/domain';
import { RentalCardUpdateInputDto } from '@rental-system/dto';

export class RentalCardUpdateRestInputDto extends RentalCardUpdateInputDto {
  @ApiProperty({ example: Object.keys(RentalPolicies)[0] })
  @IsEnum(RentalPolicies)
  readonly rentalPolicyType: RentalPolicies;
}
