import { Banner } from "src/banner/entity/banner.entity"
import { ItemType, RankType } from "../entity/item.entity"

export class CreateItemDto {
    readonly id: number
    readonly name: string
    readonly type: ItemType
    readonly rank: RankType
    readonly banners?: Array<Banner>
}