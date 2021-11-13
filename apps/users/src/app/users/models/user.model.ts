import { Column, Table, DataType, HasOne } from 'sequelize-typescript';
import { IdentifiableModel } from '@rental-system/database-storage';
import { UserAdminModel } from '../admins/models/admin.model';
import { UserCustomerModel } from '../customers/models/user-customer.model';

@Table({ tableName: 'Users' })
export class UserModel extends IdentifiableModel {
  @Column({ type: DataType.STRING, unique: true })
  name: string;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column({ type: DataType.STRING })
  password: string;

  @HasOne(() => UserAdminModel)
  adminData: UserAdminModel;

  @HasOne(() => UserCustomerModel)
  customerData: UserCustomerModel;
}
