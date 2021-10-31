import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BooksConfig } from './config/config.validator';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'apps/books/.env'],
      validate: BooksConfig.validate,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
