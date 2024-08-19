import { throwErrorNotFound } from 'core/utils/error';
import { Item } from 'database/postgres/models/final/item.model';
import { ExamplePatchType, ExamplePostType } from 'modules/dto/example.dto';

export const ExampleService = {
  getItems: async () => {
    return await Item.findAll();
  },
  getItemById: async (id: string) => {
    const item = await Item.findByPk(id);

    if (!item) {
      throwErrorNotFound(`Item with id# ${id} was not found`);
    }

    return item;
  },
  createItem: async (dto: ExamplePostType) => {
    const item = await Item.create({ ...dto });

    return item;
  },
  updateItem: async (id: string, dto: ExamplePatchType) => {
    const item = await ExampleService.getItemById(id);

    await item.update(dto);

    return item;
  },
  deleteItem: async (id: string) => {
    const item = await ExampleService.getItemById(id);

    await item.destroy();
  },
};

// export class ExampleService {
//   static async getItems() {
//     return await Item.findAll();
//   }

//   static async getItemById(id: string) {
//     const item = await Item.findByPk(id);

//     if (!item) {
//       throwErrorNotFound(`Item with id# ${id} was not found`);
//     }

//     return item;
//   }

//   static async createItem(dto: ExamplePostType) {
//     const item = await Item.create({ ...dto });

//     return item;
//   }

//   static async updateItem(id: string, dto: ExamplePatchType) {
//     const item = await this.getItemById(id);

//     await item.update(dto);

//     return item;
//   }

//   static async deleteItem(id: string) {
//     const item = await this.getItemById(id);

//     await item.destroy();
//   }
// }
