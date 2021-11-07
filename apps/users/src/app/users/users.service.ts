import { Injectable } from '@nestjs/common';
import { UserLoginInputDto } from './dto/input/login-input.dto';

@Injectable()
export class UsersService {
  public async Login(req: Request, data: UserLoginInputDto): Promise<LoginDto> {
    const user = await this.userModel.findOne({
      attributes: ['id', 'name', 'fullName', 'email', 'password', 'lang'],
      where: {
        [Op.or]: [{ name: data.nameOrEmail }, { email: data.nameOrEmail }],
        password: { [Op.ne]: null },
        active: true,
      },
    });

    if (!user || !user.ComparePassword(data.password)) {
      throw new UnauthorizedException();
    }

    await this.loginHistoryModel.create({
      address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      browser: req.headers['user-agent'],
      userId: user.id,
    });

    const userData: LoginUserDto = {
      name: user.name,
      fullName: user.fullName,
      email: user.email,
      lang: user.lang,
    };

    const jwt = sign(userData, this.config.get<string>('authentication.jwtSecret'), {
      expiresIn: this.config.get<number>('authentication.expiresIn'),
    });

    return { ...userData, jwt };
  }
}
