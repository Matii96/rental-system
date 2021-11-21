import { Column, Table, DataType } from 'sequelize-typescript';
import { IdentifiableModel } from '@rental-system/database-storage';
import { ItemTypes } from '@rental-system/domain';

@Table({ tableName: 'ItemsAvailability' })
export class ItemAvailabilityModel extends IdentifiableModel {
  @Column({ type: DataType.STRING, allowNull: false })
  type: ItemTypes;

  @Column({ type: DataType.INTEGER, allowNull: false })
  total: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  reserved: number;
}
