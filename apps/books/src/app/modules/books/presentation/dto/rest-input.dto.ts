import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { BookInputDto } from '@rental-system/dto';

export class BookRestInputDto extends BookInputDto {
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
