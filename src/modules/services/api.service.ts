import { throwErrorSimple } from 'core/utils/error';
import { BalanceTransactionModel } from 'database/postgres/models/final/balance-transaction.model';
import { UserModel } from 'database/postgres/models/final/user.model';
import { ApiUserInfoReqDto } from 'modules/dto/api-user.dto';

export const ApiUserService = {
  getList: async () => {
    const dataList = await UserModel.findAll();
    return {
      dataList,
    };
  },
  create: async () => {
    const newUser = await UserModel.create();
    return newUser;
  },
  getInfo: async (dtoQuery: ApiUserInfoReqDto) => {
    const userInfo = await UserModel.findByPk(dtoQuery.userId, {
      include: [
        {
          model: BalanceTransactionModel,
          required: false,
        },
      ],
    });
    if (!userInfo) {
      throwErrorSimple('User not found');
    }
    return userInfo;
  },
};
