export type BannerType = 1 | 11 | 12
export type RarityType = 3 | 4 | 5
export type ItemType = 'Character' | 'Light Cone'
export type RankType = 3 | 4 | 5
export type GameAccount = {
    id: number,
    uid: number
}
export type Banner = {
    id: number,
    type: BannerType,
    name?: string
}
export type PullType = {
    id: number,
    bannerId: number,
    banner: Banner,
    timestamp: string,
    item: {
        id: number,
        name: string,
        type: ItemType,
        rank: RankType,
        banners: Array<Banner>
    }
}
export type User = {
    id: number,
    username: string
}