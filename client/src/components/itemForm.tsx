import Input from "./input";
import Button from "./button";
import ItemType from "../types/item.type";
import Rarity from "../types/rarity.type";
import { FC } from 'react'
import { useState } from 'react'
import Dropdown from "./dropdown";

interface ItemFormProps {
    onclick: (item: ItemType) => void
}

const ItemForm: FC<ItemFormProps> = ({ onclick }) => {
    const [ id, setId ] = useState<number>()
    const [ name, setName ] = useState<string>('')
    const [ rarity, setRarity ] = useState<Rarity>(3)

    return <div className='flex flex-row p-2 bg-gray-200 gap-2 rounded-2xl'>
        <Input type='number' placeholder="Id" value={id as number} setValue={setId}/>
        <Input placeholder="Name" value={name} setValue={setName}/>
        <Dropdown setValue={setRarity} value={rarity}/>
        <Button 
            disabled={((!id) || (!name) || (!rarity))}
            onClick={() => {onclick({
                id: id as number,
                name: name as string,
                rarity: rarity as Rarity
            })}}>Add</Button>
    </div>
}

export default ItemForm