import { ApiProperty } from '@nestjs/swagger';
import { UserAdminEntity } from '@rental-system/domain';
import { IAdminOutput } from '@rental-system/dto-interfaces';
import { UserOutputDto } from '../../../users/presentation/dto/output/output.dto';

export class AdminOutputDto extends UserOutputDto implements IAdminOutput {
  @ApiProperty()
  agreedToNewsletter: boolean;

  @ApiProperty({ example: 1000 })
  salary: number;

  constructor(user: UserAdminEntity) {
    super(user);
    this.agreedToNewsletter = user.agreedToNewsletter;
    this.salary = user.salary;
  }
}
