import { AddConstraintOptions, QueryInterfaceOptions } from 'sequelize';

type ConstraintAddType = {
  tableName: string;
  options: AddConstraintOptions & QueryInterfaceOptions;
};

export function pgConstraintList(): ConstraintAddType[] {
  return [
    // {
    //   tableName: BalanceModel.tableName,
    //   options: {
    //     fields: ['affiliatesClaimAmount'],
    //     type: 'check',
    //     where: {
    //       affiliatesClaimAmount: {
    //         [Op.gte]: 0,
    //       },
    //     },
    //   },
    // },
    // {
    //   tableName: PromocodeModel.tableName,
    //   options: {
    //     fields: ['userCount'],
    //     type: 'check',
    //     where: {
    //       [Op.or]: {
    //         userLimit: {
    //           [Op.eq]: 0, // === 0
    //         },
    //         [Op.and]: {
    //           userLimit: {
    //             [Op.gt]: 0, // БОЛЬШЕ 0
    //           },
    //           userCount: {
    //             [Op.lte]: Sequelize.col('userLimit'), //МЕНЬШЕ лимита
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
  ];
}
