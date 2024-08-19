import { literal } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export class TestModel extends Model {
  @Column({
    defaultValue: literal(`uuid_generate_v4()`),
    type: DataType.UUID,
    primaryKey: true,
  })
  public id!: string;

  @Column
  public value!: string;
}
