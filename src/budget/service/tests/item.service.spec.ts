import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from '../item.service';

describe('ItemService', () => {
  let service: ItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemService],
    }).compile();

    service = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return empty array when there are no budgets', async () => {
      const result = await service.getAll();

      expect(result).toStrictEqual([]);
    });
  });

  describe('create', () => {
    it('should return budgets that have been created', async () => {
      for (let index = 0; index < 3; index++) {
        await service.create({
          cost: 0.5,
          name: `Item_${index + 1}`,
          description: `description`,
        });
      }
      const result = await service.getAll();

      expect(result.length).toStrictEqual(3);
      expect(result[0]).toEqual(
        expect.objectContaining({
          cost: 0.5,
          name: 'Item_1',
          description: 'description',
        }),
      );
    });
  });
});
