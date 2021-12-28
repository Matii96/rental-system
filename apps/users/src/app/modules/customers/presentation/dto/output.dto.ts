import { ApiProperty } from '@nestjs/swagger';
import { UserCustomerEntity } from '@rental-system/domain';
import { ICustomerOutput } from '@rental-system/interfaces';
import { UserOutputDto } from '../../../users/presentation/dto/output/output.dto';

export class CustomerOutputDto extends UserOutputDto implements ICustomerOutput {
  @ApiProperty()
  agreedToNewsletter: boolean;

  constructor(user: UserCustomerEntity) {
    super(user);
    this.agreedToNewsletter = user.agreedToNewsletter;
  }
}
