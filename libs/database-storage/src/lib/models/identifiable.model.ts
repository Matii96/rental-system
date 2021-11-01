import { Column, Model, DataType } from 'sequelize-typescript';

export class IdentifiableModel extends Model {
  @Column({ type: DataType.UUID, primaryKey: true })
  id: string;
}
