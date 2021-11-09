export interface IEntityModelFactory<TEntity, TModel> {
  entityToModel(entity: TEntity, ...args: any[]): TModel;
  modelToEntity(model: TModel, ...args: any[]): TEntity;
}
