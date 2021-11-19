import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { CommonConfig } from '@rental-system/config';

export class UsersConfig extends CommonConfig {
  @Transform((entry) => Number(entry.value))
  @IsNumber()
  PASSWORD_SALT: number;

  static validate(config: Record<string, unknown>) {
    return super.validate(config, UsersConfig);
  }
}
