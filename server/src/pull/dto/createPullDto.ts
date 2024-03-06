import { GameAccount } from "src/gameacc/entity/gameacc.entity"
import { BannerType } from "../entity/pull.entity"

export class CreatePullDto {
    readonly id: number
    readonly bannerId: number
    readonly bannerType: BannerType
    readonly itemId: number
    readonly timestamp: string
    readonly gameAccount: GameAccount
}