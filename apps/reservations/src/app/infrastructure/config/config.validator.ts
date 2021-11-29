import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';
import { CommonConfig } from '@rental-system/config';

export class ReservationsConfig extends CommonConfig {
  @Transform((entry) => Number(entry.value))
  @IsInt()
  RENTAL_POLICY_COUNT_LIMIT: number;

  static validate(config: Record<string, unknown>) {
    return super.validate(config, ReservationsConfig);
  }
}
