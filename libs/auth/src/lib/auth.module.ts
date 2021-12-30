import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MicroservicesModule } from '@rental-system/microservices';
import { UserAuthenticationGuard } from './guards/user-authentication.guard';
import { JwtStrategy } from './strategies/user-jwt.strategy';

@Module({
  imports: [PassportModule, MicroservicesModule],
  providers: [JwtStrategy, UserAuthenticationGuard],
  exports: [UserAuthenticationGuard],
})
export class AuthModule {}
