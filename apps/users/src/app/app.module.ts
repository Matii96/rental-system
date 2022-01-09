import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeFactory } from '@rental-system/config';
import { AdminSeeder } from './infrastructure/database/seeders/admin.seeder';
import { AppController } from './presentation/app.controller';
import { UsersConfig } from './infrastructure/config/config.validator';
import { UsersModule } from './modules/users/users.module';
import { AdminsModule } from './modules/admins/admins.module';
import { CustomersModule } from './modules/customers/customers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'apps/users/.env'],
      validate: UsersConfig.validate,
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: sequelizeFactory,
    }),
    UsersModule,
    AdminsModule,
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [AdminSeeder],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly adminSeeder: AdminSeeder) {}

  async onModuleInit() {
    await this.adminSeeder.run();
  }
}
