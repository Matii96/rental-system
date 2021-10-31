export interface IEntityModelFactory<TEntity, TModel> {
  entityToModel(entity: TEntity): TModel;
  modelToEntity(model: TModel): TEntity;
}
