import { FC } from "react"
import { PullType } from "../types"

interface PullProps {
    pull: PullType,
    simple?: boolean
}

export const Pull: FC<PullProps> = ({ pull, simple = false }) => {       
    if (simple) {
        let color
        switch(pull.item.rank) {
            case 3:
                color = 'bg-gray-200'
                break
            case 4:
                color = 'bg-purple-200'
                break
            case 5: 
                color = 'bg-orange-200'
                break
        }
        return <div className={`rounded-xl p-1 px-3 flex justify-center items-center ${color}`}>
            {pull.item.name}
        </div>
    } 
    return <div className="bg-gray-200 rounded-xl p-1 px-3 grid grid-cols-4 items-center">
        <p className="grid place-items-start">{pull.item.name}</p>
        <p className="grid place-items-center">{pull.item.type}</p>
        <p className="grid place-items-center">{pull.item.rank}</p>
        <p className="grid place-items-end">{pull.timestamp}</p>
    </div>
}