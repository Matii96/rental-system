import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FindAllSearchOptions, ICountableData } from '@rental-system/common';
import { IUser } from '@rental-system/domain';
import { AuthUserJwtDto } from '@rental-system/auth';
import { IUserLoginInput } from '@rental-system/dto-interfaces';
import { UsersRepository } from '../infrastructure/database/repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly jwt: JwtService, private readonly repository: UsersRepository) {}

  async getAll(options: FindAllSearchOptions): Promise<ICountableData<IUser>> {
    const [data, total] = await Promise.all([this.repository.findAll(options), this.repository.count()]);
    return { data, total };
  }

  async login(data: IUserLoginInput) {
    const user = await this.repository.findByLogin(data.nameOrEmail);
    user.checkPassword(data.password);
    const authData = new AuthUserJwtDto(user);
    return { user, jwt: this.jwt.sign({ ...authData }) };
  }
}