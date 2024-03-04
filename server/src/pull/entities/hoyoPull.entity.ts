import { BannerType } from "./pull.entity"

export class HoyoPull {
    public uid: number
    public gacha_id: number
    public gacha_type: BannerType
    public item_id: number
    public count: number
    public time: string
    public name: string
    public lang: string
    public item_type: 'Character' | 'Light Cone'
    public rank_type: 3 | 4 | 5
    public id: number
}