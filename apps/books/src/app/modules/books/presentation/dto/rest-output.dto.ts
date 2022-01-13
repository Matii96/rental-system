import { ApiProperty } from '@nestjs/swagger';
import { BookOutputDto } from '@rental-system/dto';

export class BookRestOutputDto extends BookOutputDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly author: string;

  @ApiProperty()
  readonly pagesCount: number;
}
