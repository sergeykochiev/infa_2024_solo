import { FC } from "react"
import { PullType } from "../types"

interface PullProps {
    pull: PullType
}

export const Pull: FC<PullProps> = ({ pull }) => {        
    return <div
        className="bg-gray-200 rounded-xl p-1 px-2 grid grid-cols-4"
    >
        <p>{pull.item.name}</p>
        <p>{pull.item.type}</p>
        <p>{pull.item.rank}</p>
        <p>{pull.timestamp}</p>
    </div>
}