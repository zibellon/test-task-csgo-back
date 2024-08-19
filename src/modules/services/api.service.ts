import { throwErrorSimple } from 'core/utils/error';
import { BalanceTransactionDirectionEnum } from 'database/postgres/constants';
import { BalanceTransactionModel } from 'database/postgres/models/final/balance-transaction.model';
import { UserModel } from 'database/postgres/models/final/user.model';
import { ApiUserBalanceDownReqDto, ApiUserBalanceUpReqDto, ApiUserInfoReqDto } from 'modules/dto/api-user.dto';
import { dbGetTrx, dbOkTrx, dbRunTrx } from 'utils/utils-db';

export const ApiUserService = {
  getList: async () => {
    const dataList = await UserModel.findAll();
    return {
      dataList,
    };
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
  balanceUp: async (dtoBody: ApiUserBalanceUpReqDto) => {
    const userInfo = await UserModel.findByPk(dtoBody.userId);
    if (!userInfo) {
      throwErrorSimple('User not found');
    }

    const transaction = await dbGetTrx();

    await dbRunTrx(
      BalanceTransactionModel.create(
        {
          direction: BalanceTransactionDirectionEnum.INCREMENT,
          amount: dtoBody.amount,
          userId: dtoBody.userId,
        },
        {
          transaction,
        }
      ),
      transaction
    );

    await dbRunTrx(
      UserModel.increment(
        {
          balance: dtoBody.amount,
        },
        {
          where: {
            id: dtoBody.userId,
          },
          transaction,
        }
      ),
      transaction
    );

    await dbOkTrx(transaction);

    return {
      message: 'Ok',
    };
  },
  balanceDown: async (dtoBody: ApiUserBalanceDownReqDto) => {
    const userInfo = await UserModel.findByPk(dtoBody.userId);
    if (!userInfo) {
      throwErrorSimple('User not found');
    }

    const transaction = await dbGetTrx();

    await dbRunTrx(
      BalanceTransactionModel.create(
        {
          direction: BalanceTransactionDirectionEnum.DECREMENT,
          amount: dtoBody.amount,
          userId: dtoBody.userId,
        },
        {
          transaction,
        }
      ),
      transaction
    );

    await dbRunTrx(
      UserModel.decrement(
        {
          balance: dtoBody.amount,
        },
        {
          where: {
            id: dtoBody.userId,
          },
          transaction,
        }
      ),
      transaction
    );

    await dbOkTrx(transaction);

    return {
      message: 'Ok',
    };
  },
};
