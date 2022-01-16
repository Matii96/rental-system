import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MicroservicesModule } from '@rental-system/microservices';
import { UserRestAuthenticationGuard } from './guards/user-rest-authentication.guard';
import { JwtStrategy } from './strategies/user-jwt.strategy';

@Module({
  imports: [PassportModule, MicroservicesModule],
  providers: [JwtStrategy, UserRestAuthenticationGuard],
})
export class AuthModule {}
