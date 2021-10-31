import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';
import { CommonConfig } from '@rental-system/config';

export class BooksConfig extends CommonConfig {
  @Transform((entry) => Number(entry.value))
  @IsInt()
  PORT: number;

  static validate(config: Record<string, unknown>) {
    return super.validate(config, BooksConfig);
  }
}
