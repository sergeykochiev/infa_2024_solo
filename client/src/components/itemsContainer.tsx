import React from 'react'
import '../index.css'
import { FC } from 'react'

interface ItemContainerProps {
    children: React.ReactNode
}

const ItemContainer: FC<ItemContainerProps> = ({ children }) => {
    const isEmpty = (children as Array<React.ReactNode>).length == 0
    return <div className={isEmpty ? 'grid place-items-center w-full' : 'flex flex-col gap-4'}>
        {isEmpty ? 'No items' : children}
    </div>
}

export default ItemContainer