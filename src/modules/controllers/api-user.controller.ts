import { ApiController, Get, Post } from 'core/api-decorators';
import { bodyValidator } from 'core/middlewares/validators/body-validator';
import { queryValidator } from 'core/middlewares/validators/query-validator';
import {
  apiUserBalanceDownReq,
  apiUserBalanceUpReq,
  apiUserInfoReq,
  apiUserInfoRes,
  apiUserListRes,
} from 'modules/dto/api-user.dto';
import { ApiUserService } from 'modules/services/api.service';
import { swBody200, swMessage200 } from 'utils/utils-swagger';

@ApiController('/api/user')
@Get({
  path: '/',
  summary: 'Получение списка всех пользователей',
  responseList: [swBody200(apiUserListRes)],
  func: async (ctx) => {
    const res = await ApiUserService.getList();
    return res;
  },
})
@Get({
  path: '/info',
  summary: 'Получение информации о пользователе',
  dtoQuerySchema: apiUserInfoReq,
  responseList: [swBody200(apiUserInfoRes)],
  handlers: [queryValidator],
  func: async (ctx) => {
    const res = await ApiUserService.getInfo(ctx.dtoQuery);
    return res;
  },
})
@Post({
  path: '/balance-up',
  summary: 'Увеличение баланса (Пополнил баланс)',
  dtoBodySchema: apiUserBalanceUpReq,
  responseList: [swMessage200()],
  handlers: [bodyValidator],
  func: async (ctx) => {
    const res = await ApiUserService.balanceUp(ctx.dtoBody);
    return res;
  },
})
@Post({
  path: '/balance-down',
  summary: 'Уменьшение баланса (Что-то купил)',
  dtoBodySchema: apiUserBalanceDownReq,
  responseList: [swMessage200()],
  handlers: [bodyValidator],
  func: async (ctx) => {
    const res = await ApiUserService.balanceDown(ctx.dtoBody);
    return res;
  },
})
export class ApiUserController {}
