import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { microservicesClientFactory } from '@rental-system/config';
import { MicroservicesEnum } from '@rental-system/microservices';
import { UserAuthenticationGuard } from './guards/user-authentication.guard';
import { JwtStrategy } from './strategies/user-jwt.strategy';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: MicroservicesEnum.USERS,
        inject: [ConfigService],
        useFactory: microservicesClientFactory,
      },
    ]),
    PassportModule,
  ],
  providers: [JwtStrategy, UserAuthenticationGuard],
  exports: [UserAuthenticationGuard],
})
export class AuthModule {}
