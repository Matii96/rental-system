import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';
import { RentalCardCreateInputDto } from '@rental-system/dto';
import { RentalPolicies } from '@rental-system/domain';

export class RentalCardCreateRestInputDto extends RentalCardCreateInputDto {
  @ApiProperty()
  @IsUUID()
  readonly ownerId: string;

  @ApiProperty({ example: Object.keys(RentalPolicies)[0] })
  @IsEnum(RentalPolicies)
  readonly rentalPolicyType: RentalPolicies;
}
