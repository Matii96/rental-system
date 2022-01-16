import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { UserOutputDto } from '@rental-system/dto';

export abstract class UserRestOutputDto extends UserOutputDto {
  @ApiProperty({ example: uuidv4() })
  readonly id: string;

  @ApiProperty({ example: 'John Smith' })
  readonly name: string;

  @ApiProperty({ example: 'john@foo.com' })
  readonly email: string;

  @ApiProperty({ example: true })
  readonly active: boolean;
}
