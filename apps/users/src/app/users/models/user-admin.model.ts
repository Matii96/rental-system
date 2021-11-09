import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserModel } from './user.model';

@Table({ tableName: 'UsersAdmins' })
export class UserAdminModel extends Model {
  @Column({ type: DataType.BOOLEAN })
  agreedToNewsletter: boolean;

  @Column({ type: DataType.DECIMAL(10, 2) })
  salary: number;

  @ForeignKey((): typeof Model => UserModel)
  @Column({ type: DataType.STRING, primaryKey: true })
  userId: string;

  @BelongsTo((): typeof Model => UserModel, { onDelete: 'CASCADE' })
  user: UserModel;
}
