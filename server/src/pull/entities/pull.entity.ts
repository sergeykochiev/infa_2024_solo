export type BannerType = 1 | 11 | 12

export class Pull {
    public id: number
    public bannerId: number
    public bannerType: BannerType
    public itemId: number
    public timestamp: string

    constructor(pull: Pull) {
        this.id = pull.id
        this.bannerId = pull.bannerId
        this.itemId = pull.itemId
        this.timestamp = pull.timestamp
    }
}