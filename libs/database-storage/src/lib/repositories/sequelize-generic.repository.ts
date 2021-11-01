import { NotFoundException } from '@nestjs/common';
import { IEntityModelFactory, IIdentifiableEntity, IRepository } from '@rental-system/common-interfaces';
import { InvalidIdException } from '../exceptions/invalid-id.exception';
import { IdentifiableModel } from '../models/identifiable.model';

export abstract class SequelizeGenericRepository<
  TEntity extends IIdentifiableEntity<string>,
  TModel extends IdentifiableModel
> implements IRepository<TEntity>
{
  constructor(
    protected readonly model: typeof IdentifiableModel,
    protected readonly modelFactory: IEntityModelFactory<TEntity, TModel>
  ) {}

  async findById(id: string) {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    if (!regexExp.test(id)) {
      throw new InvalidIdException();
    }

    const data = await this.model.findByPk(id);
    if (!data) throw new NotFoundException();
    return this.modelFactory.modelToEntity(<TModel>data);
  }

  async findOne(where: Record<string, unknown>) {
    const data = await this.model.findOne(where);
    if (!data) throw new NotFoundException();
    return this.modelFactory.modelToEntity(<TModel>data);
  }

  async findAll(where?: Record<string, unknown>) {
    const dataList = await this.model.findAll(where);
    return dataList.map((data) => this.modelFactory.modelToEntity(<TModel>data));
  }
}
