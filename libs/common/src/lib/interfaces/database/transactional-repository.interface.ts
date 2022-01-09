import { FindAllOptions } from '../../options/repositories.options';
import { IRepository } from './repository.interface';

export interface ITransactionalRepository<TEntity, TTransaction> extends IRepository<TEntity> {
  findById?(id: any, t?: TTransaction, ...args: any[]): TEntity | Promise<TEntity>;
  findOne?(filterQuery: any, t?: TTransaction, ...args: any[]): TEntity | Promise<TEntity>;
  findAll?(
    options?: FindAllOptions,
    filterQuery?: any,
    t?: TTransaction,
    ...args: any[]
  ): TEntity[] | Promise<TEntity[]>;
  create?(entity: TEntity, t?: TTransaction, ...args: any[]): TEntity | Promise<TEntity>;
  update?(entity: TEntity, t?: TTransaction, ...args: any[]): TEntity | Promise<TEntity>;
  delete?(entity: TEntity, t?: TTransaction, ...args: any[]): TEntity | Promise<TEntity>;
  countAll?(filterQuery: any, t?: TTransaction, ...args: any[]): Promise<number>;
  transaction<TTransactionResult>(
    action: (t?: TTransaction) => TTransactionResult | Promise<TTransactionResult>
  ): TTransactionResult | Promise<TTransactionResult>;
}
