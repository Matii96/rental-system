import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { IdentifiableModel } from '@rental-system/database-storage';
import { UserModel } from '../../models/user.model';

@Table({ tableName: 'UsersCustomers' })
export class UserCustomerModel extends IdentifiableModel {
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.UUID, primaryKey: true })
  id: string;

  @BelongsTo(() => UserModel, { onDelete: 'CASCADE' })
  user: UserModel;

  @Column({ type: DataType.BOOLEAN })
  agreedToNewsletter: boolean;
}
