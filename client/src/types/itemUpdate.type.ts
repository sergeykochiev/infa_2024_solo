import Rarity from './rarity.type'

interface ItemUpdateType {
    id: number,
    name?: string,
    rarity?: Rarity,
}

export default ItemUpdateType