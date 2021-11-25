import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  FindAllOptions,
  IEntityModelFactory,
  IIdentifiableEntity,
  ITransactionalRepository,
} from '@rental-system/common';
import { Transaction, ValidationError, WhereOptions } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { InvalidIdException } from '../exceptions/invalid-id.exception';
import { IdentifiableModel } from '../models/identifiable.model';

export abstract class SequelizeGenericRepository<
  TEntity extends IIdentifiableEntity<string>,
  TModel extends IdentifiableModel
> implements ITransactionalRepository<TEntity, Transaction>
{
  constructor(
    protected readonly sequelize: Sequelize,
    protected readonly model: typeof IdentifiableModel,
    protected readonly modelFactory: IEntityModelFactory<TEntity, TModel>
  ) {}

  async findById(id: string, transaction?: Transaction) {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    if (!regexExp.test(id)) {
      throw new InvalidIdException();
    }

    const data = await this.model.findByPk(id, { transaction });
    if (!data) throw new NotFoundException();
    return this.modelFactory.modelToEntity(<TModel>data);
  }

  async findOne(where: Record<string, unknown>, transaction?: Transaction) {
    const data = await this.model.findOne({ where, transaction });
    if (!data) throw new NotFoundException();
    return this.modelFactory.modelToEntity(<TModel>data);
  }

  async findAll(options: FindAllOptions = {}, where?: WhereOptions, transaction?: Transaction) {
    const dataList = await this.model.findAll({ where, ...this.applyOptions(options), transaction });
    return dataList.map((data) => this.modelFactory.modelToEntity(<TModel>data));
  }

  async create(entity: TEntity, transaction?: Transaction) {
    const data = this.modelFactory.entityToModel(entity);
    try {
      await this.model.create(data, { transaction });
    } catch (err) {
      this.handleDatabaseError(err);
    }
    return entity;
  }

  async update(entity: TEntity, transaction?: Transaction) {
    const { id, ...updateData } = this.modelFactory.entityToModel(entity);
    let updatedCount: number;
    try {
      const [matchedCount] = await this.model.update(updateData, { where: { id }, transaction });
      updatedCount = matchedCount;
    } catch (err) {
      this.handleDatabaseError(err);
    }
    if (updatedCount === 0) throw new NotFoundException();
    return entity;
  }

  async delete(entity: TEntity, transaction?: Transaction) {
    const data = await this.model.findByPk(entity.id, { transaction });
    if (!data) throw new NotFoundException();
    await data.destroy({ transaction });
    return entity;
  }

  deleteMany(where: Record<string, unknown>, transaction?: Transaction) {
    return this.model.destroy({ where, transaction });
  }

  count(where?: Record<string, unknown>, transaction?: Transaction): Promise<number> {
    return this.model.count({ where, transaction });
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

  transaction<TTransactionResult>(action: (t: Transaction) => TTransactionResult | Promise<TTransactionResult>) {
    return this.sequelize.transaction<TTransactionResult>(async (t) => action(t));
  }
}
