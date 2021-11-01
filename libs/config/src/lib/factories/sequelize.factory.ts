import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize/types';

export const sequelizeFactory = (config: ConfigService): SequelizeModuleOptions => {
  const debug = process.env.NODE_ENV !== 'production';

  const sequelize: SequelizeModuleOptions = {
    dialect: config.get<Dialect>('DB_DIALECT'),
    host: config.get<string>('DB_HOST'),
    port: config.get<number>('DB_PORT'),
    username: config.get<string>('DB_USERNAME'),
    password: config.get<string>('DB_PASSWORD'),
    database: config.get<string>('DB_NAME'),
    autoLoadModels: true,
    synchronize: debug,
  };

  if (debug) {
    const logger = new Logger('Database');
    sequelize.logging = (msg: string) => logger.debug(msg);
  }

  return sequelize;
};
