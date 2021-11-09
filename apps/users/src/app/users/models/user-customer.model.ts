import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserModel } from './user.model';

@Table({ tableName: 'UsersCustomers' })
export class UserCustomerModel extends Model {
  @Column({ type: DataType.BOOLEAN })
  agreedToNewsletter: boolean;

  @ForeignKey((): typeof Model => UserModel)
  @Column({ type: DataType.STRING, primaryKey: true })
  userId: string;

  @BelongsTo((): typeof Model => UserModel, { onDelete: 'CASCADE' })
  user: UserModel;
}
