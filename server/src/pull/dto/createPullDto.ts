import { GameAccount } from "src/gameacc/entity/gameacc.entity"
import { BannerType } from "../entity/pull.entity"
import { Item } from "src/item/entity/item.entity"

export class CreatePullDto {
    readonly id: number
    readonly bannerId: number
    readonly bannerType: BannerType
    readonly item: Item
    readonly timestamp: string
    readonly gameAccount: GameAccount
}