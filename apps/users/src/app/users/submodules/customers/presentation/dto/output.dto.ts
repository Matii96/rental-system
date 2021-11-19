import { ApiProperty } from '@nestjs/swagger';
import { UserCustomerEntity } from '@rental-system/domain';
import { ICustomerOutput } from '@rental-system/dto-interfaces';
import { UserOutputDto } from '../../../../presentation/dto/output/output.dto';

export class CustomerOutputDto extends UserOutputDto implements ICustomerOutput {
  @ApiProperty()
  agreedToNewsletter: boolean;

  constructor(user: UserCustomerEntity) {
    super(user);
    this.agreedToNewsletter = user.agreedToNewsletter;
  }
}
