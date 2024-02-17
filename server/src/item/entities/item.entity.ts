import { Rarity } from '../types/rarity.type'
import { CreateItemDto } from '../dto/create-item.dto'

export class Item {
    public id: number
    public name: string
    public rarity: Rarity

    constructor(createItemDto: CreateItemDto) {
        this.id = createItemDto.id
        this.name = createItemDto.name
        this.rarity = createItemDto.rarity
    }
}
