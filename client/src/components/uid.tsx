import { FC, ReactNode } from "react"
import { useNavigate } from "react-router"

interface UidProps {
    children: ReactNode
}

export const Uid: FC<UidProps> = ({ children }) => {
    const goto = useNavigate()
        
    return <div
        className="bg-gray-200 rounded-xl p-3 px-4 focus:outline focus:outline-2"
        onClick={() => goto(`/profile/${children}/1`)}
    >
        <p>{children}</p>
    </div>
}