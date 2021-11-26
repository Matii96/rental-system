import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '@rental-system/domain';
import { IUserOutput } from '@rental-system/dto-interfaces';

export abstract class UserOutputDto implements IUserOutput {
  @ApiProperty({ example: uuidv4() })
  id: string;

  @ApiProperty({ example: 'John Smith' })
  name: string;

  @ApiProperty({ example: 'john@foo.com' })
  email: string;

  @ApiProperty({ example: true })
  active: boolean;

  constructor(user: IUser) {
    this.id = user.id.toString();
    this.name = user.name;
    this.email = user.email;
    this.active = user.isActive();
  }
}
