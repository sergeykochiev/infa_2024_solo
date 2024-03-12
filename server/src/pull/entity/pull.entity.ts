import { GameAccount } from "src/gameacc/entity/gameacc.entity"
import { Item } from "src/item/entity/item.entity"
import { Banner } from "src/banner/entity/banner.entity"

export enum BannerType {
    STANDART = 1,
    EVENT = 11,
    WEAPON = 12
}

export class Pull {
    constructor(
        public id: number,
        public timestamp: string,
        public gameAccount: GameAccount,
        public item: Item,
        public banner: Banner,
    ) {}
}