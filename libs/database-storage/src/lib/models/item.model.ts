import { Column, DataType } from 'sequelize-typescript';
import { IdentifiableModel } from './identifiable.model';

export abstract class ItemModel extends IdentifiableModel {
  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  author: string;
}
