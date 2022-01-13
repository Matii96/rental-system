import { UserAdminEntity } from '@rental-system/domain';
import { UserOutputDto } from '../../output/output.dto';

export class AdminOutputDto extends UserOutputDto {
  readonly agreedToNewsletter: boolean;
  readonly salary: number;

  constructor(user: UserAdminEntity) {
    super(user);
    this.agreedToNewsletter = user.agreedToNewsletter;
    this.salary = user.salary;
  }
}
