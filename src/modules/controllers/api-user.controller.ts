import { ApiController, Get, Post } from 'core/api-decorators';
import { queryValidator } from 'core/middlewares/validators/query-validator';
import { apiUserInfoReq, apiUserInfoRes, apiUserListRes } from 'modules/dto/api-user.dto';
import { userDefaultRes } from 'modules/dto/default/user-default.dto';
import { ApiUserService } from 'modules/services/api.service';
import { swBody200 } from 'utils/utils-swagger';

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
@Post({
  path: '/',
  summary: 'Создание нового пользователя',
  responseList: [swBody200(userDefaultRes)],
  func: async (ctx) => {
    const res = await ApiUserService.create();
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
export class ApiUserController {}
