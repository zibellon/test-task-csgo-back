import { AddConstraintOptions, Op, QueryInterfaceOptions } from 'sequelize';
import { UserModel } from '../models/final/user.model';

type ConstraintAddType = {
  tableName: string;
  options: AddConstraintOptions & QueryInterfaceOptions;
};

export function pgConstraintList(): ConstraintAddType[] {
  return [
    {
      tableName: UserModel.tableName,
      options: {
        fields: ['balance'],
        type: 'check',
        where: {
          balance: {
            [Op.gte]: 0,
          },
        },
      },
    },
  ];
}
