export type BannerType = 1 | 11 | 12
export type RarityType = 3 | 4 | 5
export type ItemType = 'Character' | 'Light Cone'
export type RankType = 3 | 4 | 5
export type GameAccount = {
    id: number,
    uid: number
}
export type PullType = {
    id: number,
    bannerId: number,
    bannerType: BannerType,
    timestamp: string,
    item: {
        id: number,
        name: string,
        type: ItemType,
        rank: RankType
    }
}
export type User = {
    id: number,
    username: string
}