import { BadRequestException, NotFoundException } from '@nestjs/common';
import { FindAllOptions, IEntityModelFactory, IIdentifiableEntity, IRepository } from '@rental-system/common';
import { ValidationError, WhereOptions } from 'sequelize';
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

  async findAll(options: FindAllOptions = {}, where?: WhereOptions) {
    const dataList = await this.model.findAll({ where, ...this.applyOptions(options) });
    return dataList.map((data) => this.modelFactory.modelToEntity(<TModel>data));
  }

  async create(entity: TEntity) {
    const data = this.modelFactory.entityToModel(entity);
    try {
      await this.model.create(data);
    } catch (err) {
      this.handleDatabaseError(err);
    }
    return entity;
  }

  async update(entity: TEntity) {
    const { id, ...updateData } = this.modelFactory.entityToModel(entity);
    const [matchedCount] = await this.model.update(updateData, { where: { id } });
    if (matchedCount === 0) throw new NotFoundException();
    return entity;
  }

  async delete(entity: TEntity) {
    const data = await this.model.findByPk(entity.id);
    if (!data) throw new NotFoundException();
    await data.destroy();
    return entity;
  }

  deleteMany(where: Record<string, unknown>) {
    return this.model.destroy(where);
  }

  count(where?: Record<string, unknown>): Promise<number> {
    return this.model.count(where);
  }

  protected applyOptions(options: FindAllOptions) {
    return {
      ...(options.sort && options.order ? { order: [options.sort, options.order || 'ASC'] } : {}),
      ...(options.from ? { offset: options.from } : {}),
      ...(options.to ? { limit: options.to - (options.from || 0) } : {}),
    };
  }

  protected handleDatabaseError(err: ValidationError | Error) {
    if (!(err instanceof ValidationError)) {
      throw err;
    }
    throw new BadRequestException(err.errors[0].message);
  }
}
