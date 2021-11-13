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

  constructor(admin: UserAdminEntity) {
    this.name = admin.name;
    this.email = admin.email;
    this.agreedToNewsletter = admin.agreedToNewsletter;
    this.salary = admin.salary;
  }
}
