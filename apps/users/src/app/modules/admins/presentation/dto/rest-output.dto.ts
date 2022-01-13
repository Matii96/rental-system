import { ApiProperty } from '@nestjs/swagger';
import { UserAdminEntity } from '@rental-system/domain';
import { AdminOutputDto } from '@rental-system/dto';
import { UserRestOutputDto } from '../../../users/presentation/dto/rest-output/output.dto';

export class AdminRestOutputDto extends UserRestOutputDto implements AdminOutputDto {
  @ApiProperty()
  readonly agreedToNewsletter: boolean;

  @ApiProperty({ example: 1000 })
  readonly salary: number;

  constructor(user: UserAdminEntity) {
    super(user);
    this.agreedToNewsletter = user.agreedToNewsletter;
    this.salary = user.salary;
  }
}
