import { GameAccount } from "src/gameacc/entity/gameacc.entity"
import { CreatePullDto } from "../dto/createPullDto"
import { Item } from "src/item/entity/item.entity"

export type BannerType = 1 | 11 | 12

export class Pull {
    public id: number
    public bannerId: number
    public bannerType: BannerType
    public timestamp: string
    public gameAccount: GameAccount
    public item: Item

    constructor(createPullDto?: CreatePullDto) {
        if (!createPullDto) {
            return
        }
        this.id = createPullDto.id
        this.bannerId = createPullDto.bannerId
        this.bannerType = createPullDto.bannerType
        this.item = createPullDto.item
        this.timestamp = createPullDto.timestamp
        this.gameAccount = createPullDto.gameAccount
    }
}