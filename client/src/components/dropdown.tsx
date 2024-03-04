import type { FC } from 'react'
import { useState } from 'react'
import Rarity from '../types/rarity.type'

interface DropdownProps {
    value: Rarity
    setValue: any,
}

const Dropdown: FC<DropdownProps> = ({ value, setValue }) => {
    const [selectOpen, setSelectOpen] = useState(true)

    return <div className='dupa w-auto'>
        <div 
        onMouseEnter={() => {
            setSelectOpen(false)
        }} 
        onMouseLeave={() => {
            setSelectOpen(true)
        }} 
        className={
            `group absolute flex-col select-none rounded-xl 
            ${selectOpen ? 'outline-none' : 'outline-2 outline'}`
        }
        >
        <button className={
            `px-6 py-4 bg-white 
            ${selectOpen ? 'rounded-xl' : 'rounded-t-xl'}`
            }
        >
            {value}
        </button>
        {!selectOpen && [3, 4, 5].map(rarity => 
            <div
                key={rarity}
                className={
                    `px-6 py-1 last:rounded-b-xl
                    ${value == rarity ? 'bg-red-300' : 'bg-white hover:bg-gray-200'}`
                }
                onClick={() => {
                    setValue(rarity)
                    setSelectOpen(!selectOpen)
                }}
            >
                {rarity}
            </div>)}
        </div>
        <div className='py-4 px-6'>A</div>
    </div>
}

export default Dropdown