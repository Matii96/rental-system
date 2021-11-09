import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { IdentifiableModel } from '@rental-system/database-storage';
import { UserModel } from './user.model';

@Table({ tableName: 'UsersAdmins' })
export class UserAdminModel extends IdentifiableModel {
  @Column({ type: DataType.BOOLEAN })
  agreedToNewsletter: boolean;

  @Column({ type: DataType.DECIMAL(10, 2) })
  salary: number;

  @ForeignKey((): typeof Model => UserModel)
  @Column({ type: DataType.STRING })
  public userId: string;

  @BelongsTo((): typeof Model => UserModel, { onDelete: 'CASCADE' })
  public user: UserModel;
}
