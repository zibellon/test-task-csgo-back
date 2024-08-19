import { ApiController, Get } from 'core/api-decorators';
import { bodyValidator } from 'core/middlewares/validators/body-validator';
import { addName } from 'middlewares/add-name';
import {
  exampleBodySchema,
  exampleHeadersSchema,
  examplePathSchema,
  exampleQuerySchema,
  exampleRESBodySchema,
} from 'modules/dto/example.dto';
import { ExampleService } from 'modules/services/example.service';

//1. Валидаторы - оставляем (Потенциально перенести в первую позицию и убрать отсюда)
//3. SWAGGER - https://github.com/asteasolutions/zod-to-openapi
//4. response swagger - ???
//4.1 sequelize-to-json (или как-то так). Из модели sequelize сгенерить схему для JSON
//4.2 Руками писать через ZOD
//5. Доделать нормальный вывод ошибок (Добавить URL + request)

@ApiController('/example')
@Get({
  path: '/',
  summary: 'asdasdasdsa',
  dtoBodySchema: exampleBodySchema,
  dtoPathParamsSchema: examplePathSchema,
  dtoHeadersSchema: exampleHeadersSchema,
  dtoQuerySchema: exampleQuerySchema,
  responseList: [
    {
      code: 200,
      bodySchema: exampleRESBodySchema,
    },
  ],
  handlers: [addName, bodyValidator],
  func: async (ctx) => {
    console.log('DTO_EXTRAS =', ctx.dtoExtras);
    const k = ctx.dtoBody;
    console.log('BODY =', k);

    // console.log('QUERY =', ctx.dtoQuery);
    const items = await ExampleService.getItems();
    // ctx.res.json(items);

    // throwErrorSimple('KEKIS ssssssss');

    //Example with return type
    return {
      kek: 'asdf',
    };

    //Example with RES....
    // ctx.res.json({ message: 'Ok' });
  },
})
// @GET<ExampleGetByIdCTX>({
//   path: '/:id',
//   handlers: [paramsValidator(exampleIdParamsSchema)],
//   func: async (ctx) => {
//     console.log('PARAMS =', ctx.dtoPathParams);
//     // const id = ctx.dtoPathParams.id;
//     // const item = await ExampleService.getItemById(id);
//     // ctx.res.json(item);
//     ctx.res.json({ message: 'Ok' });
//   },
// })
// @POST<ExamplePostCTX>({
//   path: '/',
//   handlers: [bodyValidator(examplePostSchema)],
//   func: async (ctx) => {
//     console.log('BODY =', ctx.dtoBody);

//     // const dto: ItemCreateDto = ctx.body;
//     // const item = await ExampleService.createItem(dto);
//     ctx.res.json({ message: 'Ok' });
//   },
// })
// @PATCH<ExamplePatchCTX>({
//   path: '/:id',
//   handlers: [paramsValidator(exampleIdParamsSchema), bodyValidator(examplePatchSchema)],
//   func: async (ctx) => {
//     console.log('PARAMS =', ctx.dtoPathParams);
//     console.log('BODY =', ctx.dtoBody);
//     // const id = ctx.dtoPathParams.id;
//     // const item = await ExampleService.updateItem(id, ctx.dtoBody);
//     // ctx.res.json(item);
//     ctx.res.json({ message: 'Ok' });
//   },
// })
// @DELETE<ExampleDeleteByIdCTX>({
//   path: '/:id',
//   handlers: [paramsValidator(exampleIdParamsSchema)],
//   func: async (ctx) => {
//     console.log('PARAMS =', ctx.dtoPathParams);
//     // const id = ctx.params.id;
//     // const result = await ExampleService.deleteItem(id);
//     // ctx.res.json(result);
//     ctx.res.json({ message: 'Ok' });
//   },
// })
export class ExampleController {}
