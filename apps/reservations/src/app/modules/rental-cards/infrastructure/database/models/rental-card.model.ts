import { Column, Table, DataType } from 'sequelize-typescript';
import { IdentifiableModel } from '@rental-system/database-storage';
import { RentalPolicies } from '@rental-system/domain';

@Table({ tableName: 'RentalCards' })
export class RentalCardModel extends IdentifiableModel {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  ownerId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  rentalPolicyType: RentalPolicies;
}
