import { Column, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { IdentifiableModel } from '@rental-system/database-storage';
import { UserModel } from '../../../../users/infrastructure/database/models/user.model';

@Table({ tableName: 'UsersCustomers' })
export class UserCustomerModel extends IdentifiableModel {
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.UUID, primaryKey: true })
  id: string;

  @BelongsTo(() => UserModel, { onDelete: 'CASCADE' })
  base: UserModel;

  @Column({ type: DataType.BOOLEAN })
  agreedToNewsletter: boolean;
}
