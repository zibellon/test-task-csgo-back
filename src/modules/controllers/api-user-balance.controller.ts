import { ApiController, Post } from 'core/api-decorators';
import { bodyValidator } from 'core/middlewares/validators/body-validator';
import { apiUserBalanceDownReq, apiUserBalanceUpReq } from 'modules/dto/api-user-balance.dto';
import { ApiUserBalanceService } from 'modules/services/api-user-balance.service';
import { swMessage200 } from 'utils/utils-swagger';

@ApiController('/api/user-balance')
@Post({
  path: '/up',
  summary: 'Увеличение баланса (Пополнил баланс)',
  dtoBodySchema: apiUserBalanceUpReq,
  responseList: [swMessage200()],
  handlers: [bodyValidator],
  func: async (ctx) => {
    const res = await ApiUserBalanceService.up(ctx.dtoBody);
    return res;
  },
})
@Post({
  path: '/down',
  summary: 'Уменьшение баланса (Что-то купил)',
  dtoBodySchema: apiUserBalanceDownReq,
  responseList: [swMessage200()],
  handlers: [bodyValidator],
  func: async (ctx) => {
    const res = await ApiUserBalanceService.down(ctx.dtoBody);
    return res;
  },
})
export class ApiUserBalanceController {}
