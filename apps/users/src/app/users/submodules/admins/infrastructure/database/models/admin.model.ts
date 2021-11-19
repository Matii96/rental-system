import { Column, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { IdentifiableModel } from '@rental-system/database-storage';
import { UserModel } from 'apps/users/src/app/users/infrastructure/database/models/user.model';

@Table({ tableName: 'UsersAdmins' })
export class UserAdminModel extends IdentifiableModel {
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.UUID, primaryKey: true })
  id: string;

  @BelongsTo(() => UserModel, { onDelete: 'CASCADE' })
  base: UserModel;

  @Column({ type: DataType.BOOLEAN })
  agreedToNewsletter: boolean;

  @Column({ type: DataType.DECIMAL(10, 2) })
  salary: number;
}
