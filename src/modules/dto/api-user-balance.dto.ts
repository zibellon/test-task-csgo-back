import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

//---------
//REQ
//---------

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
