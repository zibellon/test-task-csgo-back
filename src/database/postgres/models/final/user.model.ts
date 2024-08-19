import { literal } from 'sequelize';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { BalanceTransactionModel } from './balance-transaction.model';

@Table({
  timestamps: true,
})
export class UserModel extends Model {
  @Column({
    defaultValue: literal(`uuid_generate_v4()`),
    type: DataType.UUID,
    primaryKey: true,
  })
  public id!: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  public balance!: number;

  @HasMany(() => BalanceTransactionModel, {
    foreignKey: 'userId',
  })
  public balanceTransactionList!: BalanceTransactionModel[];
}
