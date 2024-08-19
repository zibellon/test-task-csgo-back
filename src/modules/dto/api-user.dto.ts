import { extendApi } from '@anatine/zod-openapi';
import { balanceTransactionDefaultRes } from 'modules/default/balance-transaction-default.dto';
import { userDefaultRes } from 'modules/default/user-default.dto';
import { z } from 'zod';

//---------
//REQ
//---------

export const apiUserInfoReq = z.object({
  userId: extendApi(z.string().uuid(), {
    example: '4579b61e-ce65-461a-9c86-1374b4b140b8',
  }),
});
export type ApiUserInfoReqDto = z.infer<typeof apiUserInfoReq>;

export const apiUserBalanceUpReq = z.object({
  userId: extendApi(z.string().uuid(), {
    example: '4579b61e-ce65-461a-9c86-1374b4b140b8',
  }),
  amount: extendApi(z.number().positive(), {
    example: 123.45,
  }),
});
export type ApiUserBalanceUpReqDto = z.infer<typeof apiUserBalanceUpReq>;

export const apiUserBalanceDownReq = z.object({
  userId: extendApi(z.string().uuid(), {
    example: '4579b61e-ce65-461a-9c86-1374b4b140b8',
  }),
  amount: extendApi(z.number().positive(), {
    example: 123.45,
  }),
});
export type ApiUserBalanceDownReqDto = z.infer<typeof apiUserBalanceDownReq>;

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
