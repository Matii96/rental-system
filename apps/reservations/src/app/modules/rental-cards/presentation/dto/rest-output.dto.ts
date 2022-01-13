import { ApiProperty } from '@nestjs/swagger';
import { RentalPolicies } from '@rental-system/domain';
import { RentalCardOutputDto } from '@rental-system/dto';

export class RentalCardRestOutputDto extends RentalCardOutputDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly ownerId: string;

  @ApiProperty()
  readonly rentalPolicyType: RentalPolicies;
}
