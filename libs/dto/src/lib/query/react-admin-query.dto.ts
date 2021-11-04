import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { FindAllSearchOptions, QueryOrderEnum } from '@rental-system/common';
import { IsNotGreaterThan } from '@rental-system/validators';

export class ReactAdminQueryDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  _sort?: string;

  @ApiProperty({ required: false, enum: QueryOrderEnum })
  @IsString()
  @IsEnum(QueryOrderEnum)
  @IsOptional()
  _order?: QueryOrderEnum;

  @ApiProperty({ required: false, default: 0 })
  @Transform((entry) => Number(entry.value))
  @IsInt()
  @IsOptional()
  @Min(0)
  _start?: number = 0;

  @ApiProperty({ required: false, default: 25 })
  @Transform((entry) => Number(entry.value))
  @IsInt()
  @IsOptional()
  @Min(0)
  @IsNotGreaterThan('_start', 25)
  _end?: number = 25;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  q?: string;

  toOptions(): FindAllSearchOptions {
    return {
      sort: this._sort,
      order: this._order,
      from: this._start,
      to: this._end,
      search: this.q,
    };
  }
}
