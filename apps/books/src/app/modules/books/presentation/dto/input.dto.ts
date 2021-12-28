import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { IBookInput } from '@rental-system/interfaces';

export class BookInputDto implements IBookInput {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  author: string;

  @ApiProperty()
  @IsInt()
  pagesCount: number;
}
