import { plainToClass, Transform } from 'class-transformer';
import { IsBoolean, IsDefined, IsIn, IsInt, IsString, validateSync } from 'class-validator';
import { ConfigValidationError } from './errors/config-validation.error';

export class CommonConfig {
  @Transform((entry) => Number(entry.value))
  @IsInt()
  PORT: number;

  @IsString()
  REDIS_HOST: string;

  @Transform((entry) => Number(entry.value))
  @IsInt()
  REDIS_PORT: number;

  @IsString()
  REDIS_PASSWORD: string;

  @IsString()
  @IsIn(['mysql', 'postgres', 'sqlite', 'mariadb', 'mssql'])
  DB_DIALECT: string;

  @IsString()
  DB_HOST: string;

  @Transform((entry) => Number(entry.value))
  @IsInt()
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @Transform((entry) => entry.value === 'true')
  @IsBoolean()
  DB_SYNCHRONIZE: boolean;

  @Transform((entry) => entry.value === 'true')
  @IsBoolean()
  DB_SHOW_LOGS: boolean;

  @IsString()
  JWT_SECRET: string;

  @IsDefined()
  JWT_EXPIRES_IN: string | number;

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
