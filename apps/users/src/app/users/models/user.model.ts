import { Column, Table, DataType } from 'sequelize-typescript';
import { IdentifiableModel } from '@rental-system/database-storage';

@Table({ tableName: 'Users' })
export class UserModel extends IdentifiableModel {
  @Column({ type: DataType.INTEGER })
  pagesCount: number;

  @Column({ type: DataType.STRING, unique: true })
  name: string;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column({ type: DataType.STRING })
  password: string;
}
