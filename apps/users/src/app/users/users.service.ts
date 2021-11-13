import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FindAllSearchOptions, ICountableData } from '@rental-system/common';
import { UserJwtDto } from '@rental-system/auth';
import { UserLoginInputDto } from './dto/input/login-input.dto';
import { UserGenericOutputDto } from './dto/output/generic-output.dto';
import { UserLoginOutputDto } from './dto/output/login-output.dto';
import { UserOutputDto } from './dto/output/output.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly jwt: JwtService, private readonly repository: UsersRepository) {}

  async getAll(options: FindAllSearchOptions): Promise<ICountableData<UserOutputDto>> {
    const [users, total] = await Promise.all([this.repository.findAll(options), this.repository.count()]);
    return { data: users.map((user) => new UserGenericOutputDto(user)), total };
  }

  async login(data: UserLoginInputDto): Promise<UserLoginOutputDto> {
    const user = await this.repository.findByLogin(data.nameOrEmail);
    user.checkPassword(data.password);

    const userJwtData = new UserJwtDto(user);
    return new UserLoginOutputDto(user, this.jwt.sign({ ...userJwtData }));
  }
}
