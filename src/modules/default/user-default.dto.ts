import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const userDefaultRes = z.object({
  id: extendApi(z.string().uuid(), {
    example: '62b99608-c5f0-4e81-8482-378225fabb49',
  }),
  balance: extendApi(z.number(), {
    example: 123.456,
  }),
  createdAt: extendApi(z.string(), {
    example: '2023-07-16T00:39:00.027Z',
  }),
  updatedAt: extendApi(z.string(), {
    example: '2023-07-16T00:39:00.027Z',
  }),
});
