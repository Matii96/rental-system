import { ApiProperty } from '@nestjs/swagger';
import { UserCustomerEntity } from '@rental-system/domain';
import { CustomerOutputDto } from '@rental-system/dto';
import { UserRestOutputDto } from '../../../users/presentation/dto/rest-output/output.dto';

export class CustomerRestOutputDto extends UserRestOutputDto implements CustomerOutputDto {
  @ApiProperty()
  readonly agreedToNewsletter: boolean;

  constructor(user: UserCustomerEntity) {
    super(user);
    this.agreedToNewsletter = user.agreedToNewsletter;
  }
}
