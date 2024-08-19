import { literal } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['title'],
    },
    {
      using: 'BTREE',
      fields: ['title2'],
    },
    {
      using: 'HASH',
      fields: ['title3'],
    },
  ],
})
export class Item extends Model {
  @Column({
    defaultValue: literal(`uuid_generate_v4()`),
    type: DataType.UUID,
    primaryKey: true,
  })
  public id!: string;

  @Column({
    type: DataType.STRING,
  })
  public title!: string;

  @Column({
    type: DataType.STRING,
  })
  public title2!: string;

  @Column({
    type: DataType.STRING,
  })
  public title3!: string;
}
