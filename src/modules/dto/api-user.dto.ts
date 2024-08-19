import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { balanceTransactionDefaultRes } from './default/balance-transaction-default.dto';
import { userDefaultRes } from './default/user-default.dto';

//---------
//REQ
//---------

export const apiUserInfoReq = z.object({
  userId: extendApi(z.string().uuid(), {
    example: '4579b61e-ce65-461a-9c86-1374b4b140b8',
  }),
});
export type ApiUserInfoReqDto = z.infer<typeof apiUserInfoReq>;

//---------
//RES
//---------

export const apiUserListRes = z.object({
  dataList: userDefaultRes.array(),
});

export const apiUserInfoRes = userDefaultRes.merge(
  z.object({
    balanceTransactionList: balanceTransactionDefaultRes.array(),
  })
);
