import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from '../dto/create-item.dto';
import { GetItemFilterDto } from '../dto/get-item-filter-dto';
import { Item } from '../entity/item.entity';
import { ItemRepository } from '../repository/item-repository';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}
  async getAll(): Promise<Item[]> {
    return this.itemRepository.getAll();
  }

  async getById(id: string): Promise<Item> {
    const result = await this.itemRepository.getById(id);
    if (!result) {
      throw new NotFoundException(`Item with id: ${id} was not found`);
    }
    return result;
  }

  async create(request: CreateItemDto): Promise<Item> {
    return this.itemRepository.createItem(request);
  }

  async delete(id: string): Promise<Item> {
    const item = await this.itemRepository.deleteItem(id);

    if (item) {
      return item;
    }

    throw new NotFoundException(`Item with id: ${id} was not found`);
  }

  async updateName(id: string, name: string): Promise<void> {
    await this.itemRepository.updateName(id, name);
  }

  async getItemsWithFilters(filterDto: GetItemFilterDto): Promise<Item[]> {
    const { name, search } = filterDto;
    let items = await this.getAll();

    if (name) {
      items = items.filter((item) => name === item.name);
    }

    if (search) {
      items = items.filter(
        (item) =>
          item.description.includes(search) || item.name.includes(search),
      );
    }

    return items;
  }
}
