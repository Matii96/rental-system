import { ApiProperty } from '@nestjs/swagger';
import { UserCustomerEntity } from '@rental-system/domain';

export class CustomerOutputDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  agreedToNewsletter: boolean;

  @ApiProperty({ example: 1000 })
  salary: number;

  constructor(user: UserCustomerEntity) {
    this.name = user.name;
    this.email = user.email;
    this.agreedToNewsletter = user.agreedToNewsletter;
  }
}
