import { BaseRequestCTX } from 'modules/base/base.ctx';

// For example
export const addName = async (ctx: BaseRequestCTX) => {
  // ctx.dtoExtras.companyId = '12345';
  ctx.dtoExtras.userId = 'zxcasdfvfvf';
  ctx.next();
};
