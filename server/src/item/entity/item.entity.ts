import { CreateItemDto } from "../dto/createItemDto"

export type RankType = 3 | 4 | 5

export type ItemType = 'Character' | 'Light Cone'

export class Item {
    public id: number
    public name: string
    public type: ItemType
    public rank: RankType

    constructor(createItemDto: CreateItemDto) {
        if (!createItemDto) {
            return
        }
        this.id = createItemDto.id
        this.name = createItemDto.name
        this.type = createItemDto.type
        this.rank = createItemDto.rank
    }
}