import { Column, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { IdentifiableModel } from '@rental-system/database-storage';
import { RentalCardModel } from '../../../../rental-cards/infrastructure/database/models/rental-card.model';

@Table({ tableName: 'RentalCards' })
export class RentalModel extends IdentifiableModel {
  @Column({ type: DataType.STRING, allowNull: false })
  itemId: string;

  @ForeignKey(() => RentalCardModel)
  @Column({ type: DataType.UUID, allowNull: false })
  cardId: string;

  @BelongsTo(() => RentalCardModel, { onDelete: 'CASCADE' })
  card: RentalCardModel;

  @Column({ type: DataType.DATE })
  returnDate: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  expectedReturnDate: Date;

  @Column({ type: DataType.INTEGER, allowNull: false })
  prolongCounter: number;
}
