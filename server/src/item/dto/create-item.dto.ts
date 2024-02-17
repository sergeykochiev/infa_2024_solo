import { Rarity } from '../types/rarity.type'

export class CreateItemDto {
    readonly id: number
    readonly name: string
    readonly rarity: Rarity
}
