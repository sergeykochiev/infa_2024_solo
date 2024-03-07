import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemSchema } from './entity/item.entitySchema';
import { Repository } from 'typeorm';
import { Item } from './entity/item.entity';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(ItemSchema)
        private readonly itemRepository: Repository<Item>
    ) {}

    async getAll(): Promise<Array<Item>> {
        return await this.itemRepository.find()
    }

    async findOne(id: number): Promise<Item | undefined> {
        return await this.itemRepository.findOne({
            where: {
                id: id
            }
        })
    }
}
