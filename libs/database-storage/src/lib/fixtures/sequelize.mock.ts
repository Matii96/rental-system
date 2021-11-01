import { IdentifiableModel } from '../models/identifiable.model';

export class SequelizeMock<TModel extends IdentifiableModel> {
  private readonly data: TModel[] = [];

  findByPk(id: string) {
    return this.data.find((model) => model.id === id);
  }

  findOne() {
    return this.data[0];
  }

  findAll() {
    return this.data;
  }

  create(model: TModel) {
    this.data.push(model);
    return model;
  }

  update(model: TModel) {
    this.data[0] = model;
    return [1, [model]];
  }

  destroy() {
    this.data.shift();
    return 1;
  }

  count() {
    return this.data.length;
  }
}
