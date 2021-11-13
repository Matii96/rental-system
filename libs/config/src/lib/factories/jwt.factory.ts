import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtFactory = (config: ConfigService): JwtModuleOptions => ({
  secret: config.get<string>('JWT_SECRET'),
  signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') },
});
