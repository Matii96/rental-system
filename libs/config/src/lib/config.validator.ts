import { plainToClass, Transform } from 'class-transformer';
import { IsInt, IsString, validateSync } from 'class-validator';
import { ConfigValidationError } from './errors/config-validation.error';

export class CommonConfig {
  @IsString()
  REDIS_HOST: string;

  @Transform((entry) => Number(entry.value))
  @IsInt()
  REDIS_PORT: number;

  @IsString()
  REDIS_PASSWORD: string;

  static validate(config: Record<string, unknown>, configClass: typeof CommonConfig = CommonConfig) {
    const configObject = plainToClass(configClass, config);
    const errors = validateSync(configObject, { skipMissingProperties: false });

    if (errors.length === 0) {
      return configObject;
    }

    const errorsFormatted = errors.map((error) => {
      const errorString = error.toString();
      return errorString.slice(errorString.indexOf(':') + 2);
    });
    const errorFormatted = '\n' + errorsFormatted.join('');

    throw new ConfigValidationError(errorFormatted);
  }
}
