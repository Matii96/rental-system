import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { firstValueFrom } from 'rxjs';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { IUser, UsersMapper } from '@rental-system/domain';
import { MicroservicesEnum, UserGetByIdQueryPattern } from '@rental-system/microservices';
import { AuthUserJwtDto } from '../dto/auth-user-jwt.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(config: ConfigService, @Inject(MicroservicesEnum.USERS) private readonly usersClient: ClientProxy) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: AuthUserJwtDto): Promise<IUser> {
    let user: IUser;
    try {
      user = plainToClass(
        <ClassConstructor<IUser>>UsersMapper[payload.type],
        await firstValueFrom(this.usersClient.send<IUser>(new UserGetByIdQueryPattern(payload.type), payload.userId))
      );
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
