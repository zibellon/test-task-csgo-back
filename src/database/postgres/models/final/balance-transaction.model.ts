import { BalanceTransactionDirectionEnum } from 'database/postgres/constants';
import { literal } from 'sequelize';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { UserModel } from './user.model';

@Table({
  timestamps: true,
})
export class BalanceTransactionModel extends Model {
  @Column({
    defaultValue: literal(`uuid_generate_v4()`),
    type: DataType.UUID,
    primaryKey: true,
  })
  public id!: string;

  @Column({
    defaultValue: BalanceTransactionDirectionEnum.DECREMENT,
    type: DataType.ENUM({ values: Object.values(BalanceTransactionDirectionEnum) }),
  })
  public direction!: BalanceTransactionDirectionEnum;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  public amount!: number;

  //---------

  @ForeignKey(() => UserModel)
  public userId!: string;

  @BelongsTo(() => UserModel, {
    foreignKey: 'userId',
  })
  public user!: UserModel;
}
