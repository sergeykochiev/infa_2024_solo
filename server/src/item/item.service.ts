import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity'

const items = []

@Injectable()
export class ItemService {
  create(createItemDto: CreateItemDto) {
    const newItem = new Item(createItemDto)
    items.push(newItem)
    return { 
      message: 'This action adds a new item',
      value: newItem
    }
  }

  findAll() {
    return {
      message: `This action returns all items`,
      value: items
    }
  }

  findOne(id: number) {
    const foundItem = items.find(e => e.id == id)
    console.log(items, foundItem)
    return {
      message: `This action returns a #${id} item`,
      value: foundItem
    };
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    const updatedItem = items.find(e => e.id == id)
    if (updateItemDto.id) {
      updatedItem.id = updateItemDto.id
    }
    if (updateItemDto.name) {
      updatedItem.name = updateItemDto.name
    }
    if (updateItemDto.rarity) {
      updatedItem.rarity = updateItemDto.rarity
    }
    return {
      message: `This action updates a #${id} item`,
      value: updatedItem
    };
  }

  remove(id: number) {
    const deletedItemIdx = items.findIndex(e => e.id == id)
    items.splice(deletedItemIdx, 1)
    return {
      massage: `This action removes a #${id} item`
    };
  }
}
