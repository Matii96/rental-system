import { ClientProvider, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

export const microservicesClientFactory = (config: ConfigService): ClientProvider => ({
  transport: Transport.REDIS,
  options: {
    host: config.get<string>('REDIS_HOST'),
    port: config.get<number>('REDIS_PORT'),
    password: config.get<string>('REDIS_PASSWORD'),
  },
});
