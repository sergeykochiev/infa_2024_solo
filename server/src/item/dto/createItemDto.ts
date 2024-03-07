import { ItemType, RankType } from "../entity/item.entity"

export class CreateItemDto {
    readonly id: number
    readonly name: string
    readonly type: ItemType
    readonly rank: RankType
}