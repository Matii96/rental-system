import { Column, Table, DataType, HasOne } from 'sequelize-typescript';
import { IdentifiableModel } from '@rental-system/database-storage';
import { UserAdminModel } from '../../../../admins/infrastructure/database/models/admin.model';
import { UserCustomerModel } from '../../../../customers/infrastructure/database/models/user-customer.model';

@Table({ tableName: 'Users' })
export class UserModel extends IdentifiableModel {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  active: boolean;

  @HasOne(() => UserAdminModel)
  adminData: UserAdminModel;

  @HasOne(() => UserCustomerModel)
  customerData: UserCustomerModel;
}
