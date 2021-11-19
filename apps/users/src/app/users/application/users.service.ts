import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FindAllSearchOptions, ICountableData } from '@rental-system/common';
import { AuthUserJwtDto } from '@rental-system/auth';
import { UsersRepository } from '../infrastructure/database/repositories/users.repository';
import { UserOutputDto } from '../presentation/dto/output/output.dto';
import { UserGenericOutputDto } from '../presentation/dto/output/generic-output.dto';
import { UserLoginOutputDto } from '../presentation/dto/output/login-output.dto';
import { UserLoginInputDto } from '../presentation/dto/input/login-input.dto';

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
    const authData = new AuthUserJwtDto(user);
    return new UserLoginOutputDto(user, this.jwt.sign({ ...authData }));
  }
}
