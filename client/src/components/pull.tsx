import { FC } from "react"
import { PullType } from "../types"

interface PullProps {
    pull: PullType,
    simple?: boolean
}

export const Pull: FC<PullProps> = ({ pull, simple = false }) => {       
    let color
    switch(pull.item.rank) {
        case 3:
            color = 'bg-gray-200'
            break
        case 4:
            color = 'bg-purple-300'
            break   
        case 5: 
            color = 'bg-orange-300'
            break
    }    
    if (simple) {
        return <div className={`rounded-xl p-1 px-3 flex justify-center items-center ${color}`}>
            {pull.item.name}
        </div>
    } 
    return <div className={`${color} rounded-xl p-1 px-3 grid grid-cols-2 lg:grid-cols-5 items-center`}>
        <p className="grid place-items-start">{pull.item.name}</p>
        <p className="lg:grid place-items-center hidden">{pull.item.type}</p>
        <p className="lg:grid place-items-center hidden">{pull.item.id}</p>
        <p className="lg:grid place-items-center hidden">{pull.banner.id}</p>
        {/* <p className="lg:grid place-items-center hidden">{pull.item.}</p> */}
        <p className="grid place-items-end">{pull.timestamp}</p>
    </div>
}