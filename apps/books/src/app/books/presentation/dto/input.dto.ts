import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class BookInputDto {
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
