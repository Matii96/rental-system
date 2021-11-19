import { Column, Table, DataType } from 'sequelize-typescript';
import { ItemModel } from '@rental-system/database-storage';

@Table({ tableName: 'Books' })
export class BookModel extends ItemModel {
  @Column({ type: DataType.INTEGER })
  pagesCount: number;
}
