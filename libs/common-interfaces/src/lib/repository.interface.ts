export interface IRepository<TEntity> {
  findById?(id: any): TEntity | Promise<TEntity>;
  findOne?(filterQuery: any): TEntity | Promise<TEntity>;
  findAll?(filterQuery?: any, ...args: any[]): TEntity[] | Promise<TEntity[]>;
  create?(entity: TEntity): TEntity | Promise<TEntity>;
  update?(entity: TEntity): TEntity | Promise<TEntity>;
  delete?(entity: TEntity): TEntity | Promise<TEntity>;
  countAll?(filterQuery: any): Promise<number>;
}
