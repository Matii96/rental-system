import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'Books' })
export class BookModel extends Model {
  @Column({ type: DataType.UUID, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  author: boolean;

  @Column({ type: DataType.INTEGER })
  pagesCount: number;
}
