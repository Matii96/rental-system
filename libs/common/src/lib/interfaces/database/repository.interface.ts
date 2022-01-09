import { FindAllOptions } from '../../options/repositories.options';

export interface IRepository<TEntity> {
  findById?(id: any, ...args: any[]): TEntity | Promise<TEntity>;
  findOne?(filterQuery: any, ...args: any[]): TEntity | Promise<TEntity>;
  findAll?(options?: FindAllOptions, filterQuery?: any, ...args: any[]): TEntity[] | Promise<TEntity[]>;
  create?(entity: TEntity, ...args: any[]): TEntity | Promise<TEntity>;
  update?(entity: TEntity, ...args: any[]): TEntity | Promise<TEntity>;
  delete?(entity: TEntity, ...args: any[]): TEntity | Promise<TEntity>;
  countAll?(filterQuery: any, ...args: any[]): Promise<number>;
}
