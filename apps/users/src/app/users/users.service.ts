import { Injectable } from '@nestjs/common';
import { FindAllSearchOptions, ICountableData } from '@rental-system/common';
import { UserLoginInputDto } from './dto/input/login-input.dto';
import { UserLoginOutputDto } from './dto/output/login-output.dto';
import { UserOutputDto } from './dto/output/output.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async getAll(options: FindAllSearchOptions): Promise<ICountableData<UserOutputDto>> {
    const [users, total] = await Promise.all([this.repository.findAll(options), this.repository.count()]);
    return { data: users.map((user) => new UserOutputDto(user)), total };
  }

  // public async login(data: UserLoginInputDto): Promise<UserLoginOutputDto> {
  //   const user = await this.userModel.findOne({
  //     attributes: ['id', 'name', 'fullName', 'email', 'password', 'lang'],
  //     where: {
  //       [Op.or]: [{ name: data.nameOrEmail }, { email: data.nameOrEmail }],
  //       password: { [Op.ne]: null },
  //       active: true,
  //     },
  //   });
  //   if (!user || !user.ComparePassword(data.password)) {
  //     throw new UnauthorizedException();
  //   }
  //   const userData: LoginUserDto = {
  //     name: user.name,
  //     fullName: user.fullName,
  //     email: user.email,
  //     lang: user.lang,
  //   };
  //   const jwt = sign(userData, this.config.get<string>('authentication.jwtSecret'), {
  //     expiresIn: this.config.get<number>('authentication.expiresIn'),
  //   });
  //   return { ...userData, jwt };
  // }
}
