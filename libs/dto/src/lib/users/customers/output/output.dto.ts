import { UserCustomerEntity } from '@rental-system/domain';
import { UserOutputDto } from '../../output/output.dto';

export class CustomerOutputDto extends UserOutputDto {
  readonly agreedToNewsletter: boolean;

  constructor(user: UserCustomerEntity) {
    super(user);
    this.agreedToNewsletter = user.agreedToNewsletter;
  }
}
