import { ApiProperty } from '@nestjs/swagger';
import { UserAdminEntity } from '@rental-system/domain';

export class AdminOutputDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  agreedToNewsletter: boolean;

  @ApiProperty({ example: 1000 })
  salary: number;

  constructor(user: UserAdminEntity) {
    this.name = user.name;
    this.email = user.email;
    this.agreedToNewsletter = user.agreedToNewsletter;
    this.salary = user.salary;
  }
}
