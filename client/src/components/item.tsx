import '../index.css'
import { FC } from 'react'
import ItemType from '../types/item.type'
import Button from './button'
import { useState } from 'react'
import Input from './input'
import Rarity from '../types/rarity.type'
import ItemUpdateType from '../types/itemUpdate.type'
import Dropdown from './dropdown'

interface ItemProps {
    item: ItemType
    deleteF: (id: number) => void
    updateF: (item: ItemUpdateType) => void
}

const Item: FC<ItemProps> = ({ item, deleteF, updateF }) => {
    const [ updateMode, setUpdateMode ] = useState(false)
    const [ nameI, setNameI ] = useState<string>(item.name)
    const [ rarityI, setRarityI ] = useState<Rarity>(item.rarity)

    const revertState = () => {
        setUpdateMode(!updateMode)
        setNameI(item.name)
        setRarityI(item.rarity)
    }

    const modeChange = (item: ItemUpdateType) => {
        if (updateMode) {
            if ((!item.name) && (!item.rarity)) {
                revertState()
                return
            }
            updateF(item)
        }
        revertState()
    }

        return <div className={`flex gap-2 flex-row bg-gray-200 items-center rounded-2xl p-2 ${!updateMode && 'pl-6'}`}>
        {updateMode
            ?
            <Input placeholder="Name" value={nameI} setValue={setNameI} mode='header'/>
            :
            <h2 className='font-bold items-center text-xl flex-grow'>
                {item.name}
            </h2>
        }
        <p>Id:</p>
        <p>{item.id}</p>
        <p>Rarity:</p>
        {updateMode 
            ?
            <Dropdown setValue={setRarityI} value={rarityI}/>
            :
            <p>
                {item.rarity}
            </p>
        }
        <div className={`flex-row flex gap-2 ${!updateMode && 'ml-4'}`}>
            <Button onclick={() => {modeChange({
                id: item.id,
                name: item.name != nameI ? nameI : undefined,
                rarity: item.rarity != rarityI ? rarityI : undefined
            })}}>{updateMode ? 'Done' : 'Edit'}</Button>
            <Button onclick={() => {deleteF(item.id)}}>Delete</Button>
        </div>
    </div>
    
}

export default Item