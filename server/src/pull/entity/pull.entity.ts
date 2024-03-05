import { CreatePullDto } from "../dto/createPullDto"

export type BannerType = 1 | 11 | 12

export class Pull {
    public id: number
    public bannerId: number
    public bannerType: BannerType
    public itemId: number
    public timestamp: string

    constructor(createPullDto?: CreatePullDto) {
        if (!createPullDto) {
            return
        }
        this.id = createPullDto.id
        this.bannerId = createPullDto.bannerId
        this.bannerType = createPullDto.bannerType
        this.itemId = createPullDto.itemId
        this.timestamp = createPullDto.timestamp
    }
}