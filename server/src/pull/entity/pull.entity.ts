import { GameAccount } from "src/gameacc/entity/gameacc.entity"
import { Item } from "src/item/entity/item.entity"
import { Banner } from "src/banner/entity/banner.entity"

export class Pull {
    public id?: number
    public gameId: number
    public timestamp: string
    public gameAccount: GameAccount
    public item: Item
    public banner: Banner
}