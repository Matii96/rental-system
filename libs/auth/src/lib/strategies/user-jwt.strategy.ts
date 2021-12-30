import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AggregateId } from '@rental-system/common';
import { IUser } from '@rental-system/domain';
import { UsersMicroserviceClient } from '@rental-system/microservices';
import { AuthUserJwtDto } from '../dto/auth-user-jwt.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(config: ConfigService, private readonly usersClient: UsersMicroserviceClient) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: AuthUserJwtDto): Promise<IUser> {
    let user: IUser;
    try {
      user = await this.usersClient.getById(new AggregateId(payload.userId));
    } catch (err) {
      this.logger.warn(err);
      return;
    }

    if (!user.isActive()) {
      return;
    }

    return user;
  }
}
