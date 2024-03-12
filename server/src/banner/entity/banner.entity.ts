import { Item } from "src/item/entity/item.entity";
import { BannerType } from "src/pull/entity/pull.entity"

export class Banner {
    constructor(
        public id: number,
        public type: BannerType,
        public name?: string,
    ) {}
}