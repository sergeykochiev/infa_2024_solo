import { Banner } from "src/banner/entity/banner.entity"
import { CreateItemDto } from "../dto/createItemDto"

export enum RankType {
    COMMON = 3,
    EPIC = 4,
    LEGENDARY = 5
}

export enum ItemType {
    CHARACTER = 'Character',
    LIGHTCONE = 'Light Cone'
}

export class Item {
    public id: number
    public name: string
    public type: ItemType
    public rank: RankType
    public banners?: Array<Banner>
}