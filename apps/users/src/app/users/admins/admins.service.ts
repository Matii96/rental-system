import { Injectable } from '@nestjs/common';
import { AdminInputDto } from './dto/input.dto';
import { AdminOutputDto } from './dto/output.dto';
import { AdminsFactory } from './factories/admins.factory';
import { AdminsRepository } from './repositories/admins.repository';

@Injectable()
export class AdminsService {
  constructor(private readonly factory: AdminsFactory, private readonly repository: AdminsRepository) {}

  async create(data: AdminInputDto): Promise<AdminOutputDto> {
    const admin = this.factory.create(data);
    await this.repository.create(admin);
    return new AdminOutputDto(admin);
  }

  // async update(data: AdminInputDto): Promise<AdminOutputDto> {
  //   const admin = this.factory.create(data);
  //   await this.repository.update(admin);
  //   return new AdminOutputDto(admin);
  // }
}
