import { Injectable } from '@nestjs/common';
import { IDbSeeder } from '@rental-system/common';
import { AdminsFactory } from '../../../modules/admins/application/factories/admins.factory';
import { AdminsRepository } from '../../../modules/admins/infrastructure/database/repositories/admins.repository';

@Injectable()
export class AdminSeeder implements IDbSeeder {
  constructor(private readonly factory: AdminsFactory, private readonly repository: AdminsRepository) {}

  async run() {
    if ((await this.repository.count()) > 0) return;

    const user = this.factory.create({
      name: 'admin',
      email: 'admin@foo.bar',
      password: 'admin',
      active: true,
      agreedToNewsletter: false,
      salary: 0,
    });
    await this.repository.create(user);
  }
}
